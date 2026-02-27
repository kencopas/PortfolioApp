"""Events API. Event emission for ingestion, filtered event querying"""

from typing import List

from fastapi import APIRouter, HTTPException, status, Depends
from pydantic_core import ValidationError

from app.core.logger import get_logger
from app.api.deps import get_ingestion_service, get_event_log_repository
from app.services.event_ingestion import IngestionService
from app.repositories.event_log_repository import EventLogRepository

from app.domain.events.union import Event
from app.domain.events.base import BaseEvent
from app.domain.schemas.platform import PlatformEventRecord, FilteredQueryRequest


router = APIRouter(prefix="/events")
logger = get_logger("Events API")


@router.get("")
def search_events_endpoint(
    query: FilteredQueryRequest = Depends(),
    event_log: EventLogRepository = Depends(get_event_log_repository),
) -> List[PlatformEventRecord]:
    """Searches all events, currently returns all events without filters"""

    events = event_log.search_events(
        limit=query.limit,
        after=query.after,
        before=query.before,
        event_type=query.event_type,
    )

    logger.debug(f"Retrieved events: {events}")

    return events


@router.post("", status_code=status.HTTP_201_CREATED)
def emit_event(
    event: Event,
    ingestion_service: IngestionService = Depends(get_ingestion_service),
) -> BaseEvent:
    """Validates and ingests an event"""
    try:
        logger.info(f"Incoming event type: {event}")
        ingestion_service.ingest_event(event)
        return event
    except ValidationError as e:
        raise HTTPException(status_code=422, detail=e.errors())
