from typing import Literal, Optional, Dict

from .base_event import BaseEvent


class DeploymentStarted(BaseEvent):
    event_type: Literal["deployment.started"]
    image_tag: str


class DeploymentFinished(BaseEvent):
    event_type: Literal["deployment.finished"]
    image_tag: str


class DeploymentFailed(BaseEvent):
    event_type: Literal["deployment.failed"]
    image_tag: str
    reason: str
    data: Optional[Dict] = None
