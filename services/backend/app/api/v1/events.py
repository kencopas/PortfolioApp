from typing import Dict

from fastapi import APIRouter, HTTPException, status
from pydantic_core import ValidationError

from app.services.event_service import handle_event, search_events
from app.schemas.events_api_models import EventSearchResult


router = APIRouter(prefix="/events")


@router.get("", response_model=EventSearchResult)
def search_events_endpoint() -> EventSearchResult:
    """Searches all events, currently returns all events without filters"""
    return EventSearchResult(events=search_events())


@router.post("", status_code=status.HTTP_201_CREATED)
def publish_event(event_data: Dict) -> Dict:
    """Validates and publishes an event"""
    try:
        handle_event(event_data)
        return event_data
    except ValidationError as e:
        raise HTTPException(status_code=422, detail=e.errors())
