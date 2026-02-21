from .base_event import BaseEvent
from typing import Literal, Optional, Dict


class ServiceEvent(BaseEvent):
    """Base service event"""

    service: str


class ServiceStarted(ServiceEvent):
    type: Literal["service.started"]


class ServiceStopped(ServiceEvent):
    type: Literal["service.stopped"]
    reason: str


class ServiceFailure(ServiceEvent):
    type: Literal["service.failure"]
    reason: str
    data: Optional[Dict] = None
