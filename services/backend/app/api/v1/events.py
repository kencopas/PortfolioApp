"""Events API. Event emission for ingestion, filtered event querying"""

from typing import List

from fastapi import APIRouter, HTTPException, status, Depends
from pydantic_core import ValidationError

from app.core.logger import get_logger
from app.api.deps import get_ingestion_service, get_event_repository
from app.services.event_ingestion import EventIngestionService
from app.services.event_repository import EventRepository

from app.domain.events.union import Event
from app.domain.events.base import BaseEvent
from app.domain.schemas.published import PublishedEvent
from app.domain.schemas.filtered_query import FilteredQueryRequest


router = APIRouter(prefix="/events")
logger = get_logger("Events API")


@router.get("")
def search_events_endpoint(
    query: FilteredQueryRequest = Depends(),
    repo: EventRepository = Depends(get_event_repository),
) -> List[PublishedEvent]:
    """Searches all events, currently returns all events without filters"""

    events = repo.search_published_events(
        limit=query.limit,
        after=query.after,
        before=query.before,
        event_type=query.event_type,
    )

    logger.debug(f"Retrieved events: {events}")

    return events


@router.post("", status_code=status.HTTP_201_CREATED)
def publish_event(
    event: Event,
    ingestion_service: EventIngestionService = Depends(get_ingestion_service),
) -> BaseEvent:
    """Validates and publishes an event"""
    try:
        logger.info(f"Incoming event type: {event}")
        ingestion_service.ingest_event(event)
        return event
    except ValidationError as e:
        raise HTTPException(status_code=422, detail=e.errors())
