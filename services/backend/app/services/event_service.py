"""This service handles the processing of incoming events.

Events received via the Events API are processed here, where rules and policies
are applied to make inferences about operational lifecycle and system state.
"""

from typing import List
from datetime import datetime

from sqlalchemy.orm import Session

from app.schemas.base_event import BaseEvent
from app.schemas.deployment_events import DeploymentStarted
from app.models.events import IngestedEvent


class EventService:
    def __init__(self, db: Session) -> None:
        self.db = db

    def handle_event(self, event: BaseEvent) -> None:
        # Convert schema into ORM model

        if not isinstance(event, DeploymentStarted):
            print(
                "For testing purposes, no-op is chosen for any events of types other than deployment.started. Exiting..."
            )
            return

        event_model = IngestedEvent(
            event_type=event.event_type,
            received_at=datetime.now(),
            payload=event.model_dump(),
        )

        self.db.add(event_model)
        self.db.commit()
        self.db.refresh(event_model)

        print(f"Ingested Event ID: {event_model.id}")

    def search_events(self) -> List[BaseEvent]:
        """Returns all events in the events table"""
        query_result = (
            self.db.query(IngestedEvent)
            .order_by(IngestedEvent.received_at.desc())
            .all()
        )
        print(query_result[0].__dict__)
        return query_result
