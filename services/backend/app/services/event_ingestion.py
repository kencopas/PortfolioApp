"""This service handles the processing of incoming events.

Events received via the Events API are processed here, where rules and policies
are applied to make inferences about operational lifecycle and system state.
"""

from typing import List

from sqlalchemy.orm import Session

from app.models.events import IngestedEvent
from app.schemas.base_event import BaseEvent
from app.schemas.events import RegisteredEvent

from app.core.logger import get_logger

from .event_bus import EventBus


logger = get_logger("Event Ingestion")


class EventIngestionService:
    def __init__(self, db: Session, bus: EventBus) -> None:
        self.db = db
        self.bus = bus

    def handle_event(self, event: BaseEvent) -> None:
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

    def search_events(self) -> List[RegisteredEvent]:
        """Returns all events in the events table"""
        query_result = (
            self.db.query(IngestedEvent)
            .order_by(IngestedEvent.received_at.desc())
            .all()
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
