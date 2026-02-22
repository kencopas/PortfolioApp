"""This service handles the processing of incoming events.

Events received via the Events API are processed here, where rules and policies
are applied to make inferences about operational lifecycle and system state.
"""

from typing import List, Dict

from app.models.base_event import BaseEvent
from app.db.data_client import load_events, persist_event

from .event_adapter import event_adapter


def handle_event(event_data: Dict) -> None:
    try:
        event = event_adapter.validate_python(event_data)
    except Exception as e:
        print(f"Exception occurred while validating event data: {str(e)}")
        raise e

    persist_event(event)


def search_events() -> List[BaseEvent]:
    return load_events()
