from uuid import UUID
from datetime import datetime
from typing import Annotated, Union

from pydantic import Field, BaseModel

from .deployment_events import DeploymentFailed, DeploymentFinished, DeploymentStarted
from .service_events import ServiceFailed, ServiceStarted, ServiceStopped


Event = Annotated[
    Union[
        DeploymentFailed,
        DeploymentFinished,
        DeploymentStarted,
        ServiceFailed,
        ServiceStarted,
        ServiceStopped,
    ],
    Field(discriminator="event_type"),
]


class RegisteredEvent(BaseModel):
    id: UUID
    event_type: str
    received_at: datetime
    payload: Event
