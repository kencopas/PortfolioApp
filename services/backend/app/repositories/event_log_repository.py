from uuid import UUID
from datetime import datetime
from typing import Optional, Dict, Any, List

from sqlalchemy.orm import Session

from app.core.logger import get_logger
from app.db.models.platform_event import PlatformEvent
from app.domain.schemas.platform import PlatformEventRecord


logger = get_logger("Event Log Repo")


class EventLogRepository:
    """Handles database interaction for event logging"""

    def __init__(self, db: Session):
        """Creates an event log repository with a database connection"""
        self._db = db

    def search_events(
        self,
        limit: Optional[int] = None,
        after: Optional[datetime] = None,
        before: Optional[datetime] = None,
        event_type: Optional[str] = None,
    ) -> List[PlatformEventRecord]:
        """Search platform events and apply filter criteria"""

        # Construct filter criteria
        criteria = []
        if after:
            criteria.append(PlatformEvent.received_at >= after)
        if before:
            criteria.append(PlatformEvent.received_at <= before)
        if event_type:
            criteria.append(PlatformEvent.event_type == event_type)

        # Perform filtered query
        query = self._db.query(PlatformEvent).filter(*criteria)

        # Apply query limit
        if limit:
            query = query.limit(limit)

        # Construct platform event records from ORM models
        events = [
            PlatformEventRecord(
                id=res.id,
                event_type=res.event_type,
                received_at=res.received_at,
                payload=res.payload,
            )
            for res in query
        ]

        return events

    def persist_event(
        self,
        event_id: UUID,
        service_id: Optional[UUID],
        deployment_id: Optional[UUID],
        event_type: str,
        received_at: datetime,
        payload: Dict[str, Any],
    ) -> None:
        """Persist a platform event"""

        try:
            # Construct ORM model
            platform_event = PlatformEvent(
                id=event_id,
                service_id=service_id,
                deployment_id=deployment_id,
                event_type=event_type,
                received_at=received_at,
                payload=payload,
            )
        except Exception:
            logger.exception("Exception occurred during platform event persistence.")
            logger.warning("Persisting unpackaged event...")
            platform_event = PlatformEvent(payload=payload)

        # Add and commit to db
        self._db.add(platform_event)
        self._db.commit()
