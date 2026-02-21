from typing import Dict

from fastapi import APIRouter

from services.event_service import handle_event, search_events
from .schemas import EventSearchResult, EventPublishResult


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
    except Exception as e:
        return EventPublishResult(status="failed", reason=str(e))
