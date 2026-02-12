import hmac
import hashlib
import json
import os
import subprocess
from flask import Flask, request, abort

app = Flask(__name__)

WEBHOOK_SECRET = os.environ.get("WEBHOOK_SECRET", "").encode()
DEPLOY_SCRIPT = os.environ.get("DEPLOY_SCRIPT", "../scripts/deploy.sh")
ALLOWED_REF = os.environ.get("ALLOWED_REF", "refs/heads/main")

def verify_signature(raw_body: bytes, signature_header: str) -> bool:
    if not WEBHOOK_SECRET:
        return False
    if not signature_header or not signature_header.startswith("sha256="):
        return False
    their_sig = signature_header.split("sha256=", 1)[1].strip()
    our_sig = hmac.new(WEBHOOK_SECRET, raw_body, hashlib.sha256).hexdigest()
    return hmac.compare_digest(our_sig, their_sig)

@app.post("/__deploy")
def deploy():
    raw = request.get_data()  # bytes
    sig = request.headers.get("X-Hub-Signature-256", "")
    event = request.headers.get("X-GitHub-Event", "")

    if event != "push":
        return {"ok": True, "ignored": "not a push event"}, 200

    if not verify_signature(raw, sig):
        abort(401)

    payload = json.loads(raw.decode("utf-8"))
    ref = payload.get("ref", "")
    if ref != ALLOWED_REF:
        return {"ok": True, "ignored": f"ref {ref} not allowed"}, 200

    # run deploy
    proc = subprocess.run([DEPLOY_SCRIPT], capture_output=True, text=True)
    if proc.returncode != 0:
        return {"ok": False, "stderr": proc.stderr, "stdout": proc.stdout}, 500

    return {"ok": True, "stdout": proc.stdout}, 200
