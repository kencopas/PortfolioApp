"""API schemas for service-related events"""

from uuid import UUID
from typing import Literal, Optional, Dict

from .base_event import BaseEvent


class ServiceRegistration(BaseEvent):
    """One-time service registration via service name"""

    service_name: str


class ServiceEvent(BaseEvent):
    """Base model for service-related events"""

    service_id: UUID


class ServiceStarted(ServiceEvent):
    event_type: Literal["service.started"]
    service_name: str


class ServiceStopped(ServiceEvent):
    event_type: Literal["service.stopped"]
    service_name: str
    reason: str


class ServiceFailed(ServiceEvent):
    event_type: Literal["service.failed"]
    service_name: str
    reason: str
    data: Optional[Dict] = None
