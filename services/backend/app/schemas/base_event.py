from datetime import datetime
from typing import Optional

from pydantic import BaseModel


class BaseEvent(BaseModel):
    "Base platform event"

    event_type: str
    occurred_at: Optional[datetime] = None
