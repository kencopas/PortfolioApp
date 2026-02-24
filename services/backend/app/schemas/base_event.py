from typing import Optional
from datetime import datetime

from pydantic import BaseModel

from app.models.events import IngestedEvent


class BaseEvent(BaseModel):
    """Base platform event"""

    event_type: str
    occurred_at: Optional[datetime] = None

    def to_ingested_event(self) -> IngestedEvent:
        """Constructs and returns an `IngestedEvent` from the instance attributes"""
        return IngestedEvent(
            event_type=self.event_type,
            payload=self.model_dump(),
        )
