from typing import List, Literal
from pydantic import BaseModel
from models.base_event import BaseEvent


class EventSearchResult(BaseModel):
    events: List[BaseEvent]


class EventPublishResult(BaseModel):
    status: Literal["successful", "failed"]
