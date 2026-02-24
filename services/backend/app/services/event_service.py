"""This service handles the processing of incoming events.

Events received via the Events API are processed here, where rules and policies
are applied to make inferences about operational lifecycle and system state.
"""

from typing import List
from datetime import datetime

from sqlalchemy.orm import Session

from app.schemas.base_event import BaseEvent
from app.models.events import IngestedEvent


class EventService:
    def __init__(self, db: Session) -> None:
        self.db = db

    def handle_event(self, event: BaseEvent) -> None:
        # Convert schema into ORM model
        event_model = IngestedEvent(
            event_type=event.event_type,
            service_id=getattr(event, "service_id", None),
            deployment_id=getattr(event, "deployment_id", None),
            occurred_at=event.occurred_at,
            event_data=event.model_dump(),
        )

        self.db.add(event_model)
        self.db.commit()
        self.db.refresh(event)

    def search_events(self) -> List[BaseEvent]:
        """Returns all events in the events table"""
        return (
            self.db.query(IngestedEvent)
            .order_by(IngestedEvent.occurred_at.desc())
            .all()
        )
