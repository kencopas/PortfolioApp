"""This module is where processed events are persisted to the database"""

import json
from typing import List

from models.base_event import BaseEvent
from services.event_adapter import event_adapter


DB_FILE_URL = "./db/database.jsonl"


def load_events() -> List[BaseEvent]:
    with open(DB_FILE_URL, "r") as f:
        db_data = json.load(f)

    validated_data = map(lambda ed: event_adapter.validate_python(ed), db_data)
    return list(validated_data)


def persist_event(event: BaseEvent) -> None:
    event_data = event.model_dump()
    with open(DB_FILE_URL, "r") as f:
        db_data = json.load(f)

    db_data.append(event_data)

    with open(DB_FILE_URL, "w") as f:
        json.dump(db_data, f, default=str)
