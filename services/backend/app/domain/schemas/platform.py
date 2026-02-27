from uuid import UUID
from datetime import datetime

from pydantic import BaseModel

from app.domain.events.union import Event


class PlatformEventRecord(BaseModel):
    id: UUID
    event_type: str
    received_at: datetime
    payload: Event

    def __str__(self):
        return (
            f"<{type(self).__name__} id={str(self.id)[:5]} payload={str(self.payload)}>"
        )
