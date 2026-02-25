"""Ingests all incoming events through packaging, persisting, and publishing."""

from sqlalchemy.orm import Session

from app.models.events import IngestedEvent
from app.schemas.base_event import BaseEvent
from app.core.logger import get_logger

from .event_bus import EventBus


logger = get_logger("Event Ingestion")


class EventIngestionService:
    def __init__(self, db: Session, bus: EventBus) -> None:
        self.db = db
        self.bus = bus

    def ingest_event(self, event: BaseEvent) -> None:
        try:
            # Convert schema into ORM model
            logger.info(f"Ingesting event: {event.event_type}")
            event_model = event.to_ingested_event()

            # Add and commit to db
            self.db.add(event_model)
            self.db.commit()

            # Publis event
            logger.info(f"Publishing event: {event.event_type}")
            self.bus.publish(event, self.db)
        except Exception as e:
            logger.error(f"Exception occured: {e}")
            logger.warning("Persisting unpackaged event...")
            event_model = IngestedEvent(payload=event.model_dump())
