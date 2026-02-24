from typing import List

from fastapi import APIRouter, HTTPException, status, Depends
from pydantic_core import ValidationError

from app.services.event_ingestion import EventIngestionService
from app.schemas.base_event import BaseEvent
from app.schemas.events import Event, RetrievedEvent
from app.api.deps import get_event_service


router = APIRouter(prefix="/events")


@router.get("")
def search_events_endpoint(
    limit: int = 100,
    event_service: EventIngestionService = Depends(get_event_service),
) -> List[RetrievedEvent]:
    """Searches all events, currently returns all events without filters"""
    return event_service.search_events()[:limit]


@router.post("", status_code=status.HTTP_201_CREATED)
def publish_event(
    event: Event,
    event_service: EventIngestionService = Depends(get_event_service),
) -> BaseEvent:
    """Validates and publishes an event"""
    try:
        print(f"Incoming event type: {type(event)}")
        event_service.handle_event(event)
        return event
    except ValidationError as e:
        raise HTTPException(status_code=422, detail=e.errors())
