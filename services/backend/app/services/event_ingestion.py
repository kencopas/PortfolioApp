"""Ingests all incoming events through packaging, persisting, and publishing."""

from datetime import datetime, timezone

from app.core.logger import get_logger
from app.domain.events.base import BaseEvent
from app.services.event_bus import EventBus
from app.services.handler_context import HandlerContext
from app.repositories.deployment_repository import DeploymentRepository
from app.repositories.event_log_repository import EventLogRepository


logger = get_logger("Event Ingestion")


class IngestionService:
    """Ingestion service for emitted events"""

    def __init__(
        self,
        deployments: DeploymentRepository,
        event_log: EventLogRepository,
        bus: EventBus,
    ) -> None:
        """Constructs an ingestion service with repository and event bus access"""
        self.deployments = deployments
        self.event_log = event_log
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
        self.event_log.persist_event(
            event_id=event.id,
            service_id=event.service_id,
            deployment_id=event.deployment_id,
            event_type=event.event_type,
            received_at=datetime.now(timezone.utc),
            payload=event.model_dump(mode="json"),
        )

        # Construct handler context
        ctx = HandlerContext(
            deployments=self.deployments,
            event_log=self.event_log,
        )

        # Publish event
        logger.info(f"Publishing event: {event}")
        self.bus.publish(event, ctx)
