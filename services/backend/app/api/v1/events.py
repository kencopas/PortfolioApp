"""Events API. Event emission for ingestion, filtered event querying"""

from typing import List

from fastapi import APIRouter, HTTPException, status, Depends
from pydantic_core import ValidationError
from sqlalchemy.orm import Session

from app.core.logger import get_logger
from app.services.event_ingestion import EventIngestionService
from app.schemas.base_event import BaseEvent, IngestedEvent
from app.schemas.events import Event, RegisteredEvent
from app.api.deps import get_ingestion_service, get_db


router = APIRouter(prefix="/events")
logger = get_logger("Events API")


@router.get("")
def search_events_endpoint(
    limit: int = 100,
    db: Session = Depends(get_db),
) -> List[RegisteredEvent]:
    """Searches all events, currently returns all events without filters"""
    query_result = (
        db.query(IngestedEvent).order_by(IngestedEvent.received_at.desc()).limit(limit)
    )

    if not all(isinstance(res, IngestedEvent) for res in query_result):
        logger.error("Recieved a non-`IngestedEvent` object from query")
        return []

    retrieved_events = [
        RegisteredEvent(
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
        print(f"Incoming event type: {type(event)}")
        ingestion_service.ingest_event(event)
        return event
    except ValidationError as e:
        raise HTTPException(status_code=422, detail=e.errors())
