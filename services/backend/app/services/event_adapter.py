from __future__ import annotations

from typing import Annotated, Union

from pydantic import Field, TypeAdapter

from app.schemas.deployment_events import (
    DeploymentFailed,
    DeploymentFinished,
    DeploymentStarted,
)
from app.schemas.service_events import ServiceFailure, ServiceStarted, ServiceStopped


Event = Annotated[
    Union[
        DeploymentFailed,
        DeploymentFinished,
        DeploymentStarted,
        ServiceFailure,
        ServiceStarted,
        ServiceStopped,
    ],
    Field(discriminator="type"),
]
event_adapter = TypeAdapter(Event)
