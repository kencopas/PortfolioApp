from typing import List

from pydantic import BaseModel

from app.schemas.base_event import BaseEvent


class EventSearchResult(BaseModel):
    events: List[BaseEvent]
