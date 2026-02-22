from __future__ import annotations

from typing import Annotated, Union

from pydantic import Field, TypeAdapter

from app.models.deployment_events import (
    DeploymentFailed,
    DeploymentFinished,
    DeploymentStarted,
)
from app.models.service_events import ServiceFailure, ServiceStarted, ServiceStopped


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
