from uuid import UUID
from typing import Optional
from datetime import datetime

from pydantic import BaseModel

from app.models.events import IngestedEvent


class BaseEvent(BaseModel):
    """Base platform event"""

    id: UUID
    event_type: str
    service_id: Optional[UUID] = None
    deployment_id: Optional[UUID] = None
    occurred_at: Optional[datetime] = None

    def to_ingested_event(self) -> IngestedEvent:
        """Constructs and returns an `IngestedEvent` from the instance attributes"""

        return IngestedEvent(
            id=self.id,
            event_type=self.event_type,
            service_id=self.service_id,
            deployment_id=self.deployment_id,
            payload=self.model_dump(mode="json"),
        )
