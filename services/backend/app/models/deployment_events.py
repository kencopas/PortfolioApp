from typing import Literal, Optional, Dict

from .base_event import BaseEvent


class DeploymentEvent(BaseEvent):
    """Base deployment event"""

    image_tag: str


class DeploymentStarted(DeploymentEvent):
    type: Literal["deployment.started"]


class DeploymentFinished(DeploymentEvent):
    type: Literal["deployment.finished"]


class DeploymentFailed(DeploymentEvent):
    type: Literal["deployment.failed"]
    reason: str
    data: Optional[Dict] = None
