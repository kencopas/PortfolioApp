"""Ingests all incoming events through packaging, persisting, and publishing."""

from datetime import datetime, timezone

from app.domain.events.base import BaseEvent
from app.domain.event_bus import EventBus
from app.core.logger import get_logger

from .event_repository import EventRepository


logger = get_logger("Event Ingestion")


class EventIngestionService:
    def __init__(self, repo: EventRepository, bus: EventBus) -> None:
        self.repo = repo
        self.bus = bus

    def ingest_event(self, event: BaseEvent) -> None:
        """Package, persist, and publish an incoming event"""

        # Ingest and package event
        logger.info(f"Ingesting event: {event}")

        # -----
        # Event ingestion and packaging logic...
        # -----

        # Persist ingested and packaged event
        logger.info("Persisting event...")
        self.repo.persist_published_event(
            event_id=event.id,
            service_id=event.service_id,
            deployment_id=event.deployment_id,
            event_type=event.event_type,
            received_at=datetime.now(timezone.utc),
            payload=event.model_dump(mode="json"),
        )

        # Publish event
        logger.info(f"Publishing event: {event}")
        self.bus.publish(event, self.repo)
