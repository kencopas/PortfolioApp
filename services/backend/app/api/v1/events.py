"""Events API. Event emission for ingestion, filtered event querying"""

from typing import List

from fastapi import APIRouter, HTTPException, status, Depends
from pydantic_core import ValidationError
from sqlalchemy.orm import Session

from app.core.logger import get_logger
from app.api.deps import get_ingestion_service, get_db
from app.services.event_ingestion import EventIngestionService

from app.domain.events.union import Event
from app.domain.events.published import PublishedEvent
from app.domain.events.base import BaseEvent
from app.domain.models.published import Published


router = APIRouter(prefix="/events")
logger = get_logger("Events API")


@router.get("")
def search_events_endpoint(
    limit: int = 100,
    db: Session = Depends(get_db),
) -> List[PublishedEvent]:
    """Searches all events, currently returns all events without filters"""
    query_result = (
        db.query(Published).order_by(Published.received_at.desc()).limit(limit)
    )

    if not all(isinstance(res, Published) for res in query_result):
        logger.error("Recieved a non-`Published` object from query")
        return []

    retrieved_events = [
        PublishedEvent(
            id=res.id,
            event_type=res.event_type,
            received_at=res.received_at,
            payload=res.payload,
        )
        for res in query_result
    ]

    logger.debug(f"Retrieved events: {retrieved_events}")

    return retrieved_events


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
