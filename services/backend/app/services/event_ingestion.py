"""Ingests all incoming events through packaging, persisting, and publishing."""

from sqlalchemy.orm import Session

from app.domain.models.published import Published
from app.domain.events.base import BaseEvent
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
            logger.info(f"Ingesting event: {event}")
            event_model = event.to_published_event()

            # Add and commit to db
            logger.info(f"Persisting packaged event: {event_model}")
            self.db.add(event_model)
            self.db.commit()

            # Publis event
            logger.info(f"Publishing event: {event}")
            self.bus.publish(event, self.db)
        except Exception as e:
            logger.error(f"Exception occured: {e}")
            event_model = Published(payload=event.model_dump())
            logger.warning(f"Persisting unpackaged event: {event_model}")

            self.db.add(event_model)
            self.db.commit()
