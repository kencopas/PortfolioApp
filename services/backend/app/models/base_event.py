from datetime import datetime

from pydantic import BaseModel


class BaseEvent(BaseModel):
    "Base platform event"

    type: str
    id: str
    ts: datetime
