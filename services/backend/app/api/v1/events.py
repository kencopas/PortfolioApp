from typing import Dict

from fastapi import APIRouter, HTTPException
from pydantic_core import ValidationError

from app.services.event_service import handle_event, search_events

from app.schemas.events_api_models import EventSearchResult, EventPublishResult


router = APIRouter(prefix="/events")


@router.get("", response_model=EventSearchResult)
def search_events_endpoint() -> EventSearchResult:
    """Searches all events, currently returns all events without filters"""
    return EventSearchResult(events=search_events())


@router.post("")
def publish_event(event_data: Dict) -> EventPublishResult:
    """Validates and publishes an event"""
    try:
        handle_event(event_data)
        return EventPublishResult(status="successful")
    except ValidationError as e:
        raise HTTPException(status_code=422, detail=e.errors())
