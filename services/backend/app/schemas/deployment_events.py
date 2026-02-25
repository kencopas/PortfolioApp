"""API schemas for deployment-related events"""

from uuid import UUID
from typing import Literal, Optional, Dict

from .base_event import BaseEvent


class DeploymentEvent(BaseEvent):
    """Base event for deployment-related events"""

    deployment_id: UUID
    image_tag: str


class DeploymentStarted(DeploymentEvent):
    event_type: Literal["deployment.started"]


class DeploymentFinished(DeploymentEvent):
    event_type: Literal["deployment.finished"]


class DeploymentFailed(DeploymentEvent):
    event_type: Literal["deployment.failed"]
    reason: str
    data: Optional[Dict] = None
