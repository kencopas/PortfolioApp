from typing import List

from fastapi import APIRouter, HTTPException, status
from pydantic_core import ValidationError

from app.services.event_service import handle_event, search_events
from app.schemas.base_event import BaseEvent
from app.schemas.events import EventUnion


router = APIRouter(prefix="/events")


@router.get("")
def search_events_endpoint() -> List[BaseEvent]:
    """Searches all events, currently returns all events without filters"""
    return search_events()


@router.post("", status_code=status.HTTP_201_CREATED)
def publish_event(event_data: EventUnion) -> EventUnion:
    """Validates and publishes an event"""
    try:
        print(f"Incoming event type: {type(event_data)}")
        handle_event(event_data)
        return event_data
    except ValidationError as e:
        raise HTTPException(status_code=422, detail=e.errors())
