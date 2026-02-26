from uuid import UUID
from typing import Optional
from datetime import datetime

from pydantic import BaseModel

from app.core.logger import GREEN, RESET


class BaseEvent(BaseModel):
    """Base platform event"""

    id: UUID
    event_type: str
    service_id: Optional[UUID] = None
    deployment_id: Optional[UUID] = None
    occurred_at: Optional[datetime] = None

    def __str__(self) -> str:
        text = f"{GREEN}<{type(self).__name__} id={str(self.id)[:5]}"

        if self.service_id:
            text += f" service_id={str(self.service_id)[:5]}"

        if self.deployment_id:
            text += f" deployment_id={str(self.deployment_id)[:5]}"

        text += f">{RESET}"

        return text
