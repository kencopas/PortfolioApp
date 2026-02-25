from uuid import UUID
from datetime import datetime

from pydantic import BaseModel

from .union import Event


class PublishedEvent(BaseModel):
    id: UUID
    event_type: str
    received_at: datetime
    payload: Event
