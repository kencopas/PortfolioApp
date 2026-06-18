import asyncio
import os
import tempfile
from collections import deque

import numpy as np
import soundfile as sf
import websockets
import whisper
from openai import OpenAI
from scipy.signal import resample_poly

HOST = "0.0.0.0"
PORT = 8765

SAMPLE_RATE = 16000
BLOCKSIZE = 1600  # 100 ms

BUFFER_SECONDS = 30
CHUNKS_PER_SECOND = SAMPLE_RATE // BLOCKSIZE
MAX_CHUNKS = BUFFER_SECONDS * CHUNKS_PER_SECOND

SYSTEM_INSTRUCTIONS = """
You are a robot named RoBert.
Keep in mind, the user is communicating through speech which is converted to text.
Apart from that, you are a helpful assistant.
"""

connected_clients = set()
audio_buffer = deque(maxlen=MAX_CHUNKS)

llm = OpenAI()

print("Loading speech model...")
whisper_model = whisper.load_model("base.en")

messages = [{"role": "system", "content": SYSTEM_INSTRUCTIONS}]


async def send_audio_to_clients(audio: np.ndarray):
    for i in range(0, len(audio), BLOCKSIZE):
        chunk = audio[i : i + BLOCKSIZE]

        if len(chunk) < BLOCKSIZE:
            chunk = np.pad(chunk, (0, BLOCKSIZE - len(chunk)))

        data = chunk.astype(np.int16).tobytes()

        disconnected = []

        for ws in connected_clients:
            try:
                await ws.send(data)
            except websockets.ConnectionClosed:
                disconnected.append(ws)

        for ws in disconnected:
            connected_clients.discard(ws)

        await asyncio.sleep(BLOCKSIZE / SAMPLE_RATE)


async def speak_text(text_in: str):
    global messages

    if not text_in.strip():
        return

    print(f"\nTranscript: {text_in}\n")

    messages.append({"role": "user", "content": text_in})

    response = llm.responses.create(
        model="gpt-5.5",
        input=messages,
        stream=False,
    )

    reply_text = response.output_text.strip()

    if not reply_text:
        reply_text = "I do not have a response."

    print(f"RoBert: {reply_text}\n")

    with tempfile.NamedTemporaryFile(suffix=".aiff", delete=False) as f:
        path = f.name

    reply_text = reply_text.replace("RoBert", "rowbert")

    try:
        proc = await asyncio.create_subprocess_exec(
            "say",
            "-o",
            path,
            reply_text,
        )
        await proc.wait()

        audio, sample_rate = sf.read(
            path,
            dtype="float32",
            always_2d=True,
        )

        audio = audio.mean(axis=1)

        if sample_rate != SAMPLE_RATE:
            audio = resample_poly(audio, SAMPLE_RATE, sample_rate)

        audio = np.clip(audio, -1.0, 1.0)
        audio = (audio * 32767).astype(np.int16)

        await send_audio_to_clients(audio)

    finally:
        if os.path.exists(path):
            os.remove(path)


async def transcribe_loop():
    while True:
        await asyncio.to_thread(input, "\nPress Enter to transcribe...")

        if not audio_buffer:
            print("No audio available.")
            continue

        chunks = list(audio_buffer)
        audio_buffer.clear()

        pcm = b"".join(chunks)

        samples = np.frombuffer(pcm, dtype=np.int16).astype(np.float32) / 32768.0

        with tempfile.NamedTemporaryFile(suffix=".wav", delete=False) as f:
            wav_path = f.name

        try:
            sf.write(wav_path, samples, SAMPLE_RATE)

            result = await asyncio.to_thread(
                whisper_model.transcribe,
                wav_path,
                fp16=False,
            )

            text = result["text"].strip()

            if not text:
                text = "I didn't hear anything."

            await speak_text(text)

        finally:
            if os.path.exists(wav_path):
                os.remove(wav_path)


async def handle_connection(websocket):
    print(f"Connected: {websocket.remote_address}")

    connected_clients.add(websocket)

    try:
        async for message in websocket:
            if isinstance(message, bytes):
                audio_buffer.append(message)

    except websockets.ConnectionClosed:
        pass

    finally:
        connected_clients.discard(websocket)
        print(f"Disconnected: {websocket.remote_address}")


async def main():
    async with websockets.serve(
        handle_connection,
        HOST,
        PORT,
        max_size=None,
        ping_interval=20,
        ping_timeout=None,
    ):
        print(f"Listening on ws://{HOST}:{PORT}")
        await transcribe_loop()


if __name__ == "__main__":
    asyncio.run(main())
