from typing import List, Literal

from pydantic import BaseModel

from app.schemas.base_event import BaseEvent


class EventSearchResult(BaseModel):
    events: List[BaseEvent]


class EventPublishResult(BaseModel):
    status: Literal["successful", "failed"]
