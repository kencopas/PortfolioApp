from typing import Literal, Optional, Dict

from .base_event import BaseEvent


class ServiceStarted(BaseEvent):
    event_type: Literal["service.started"]
    service_name: str


class ServiceStopped(BaseEvent):
    event_type: Literal["service.stopped"]
    service_name: str
    reason: str


class ServiceFailed(BaseEvent):
    event_type: Literal["service.failed"]
    service_name: str
    reason: str
    data: Optional[Dict] = None
