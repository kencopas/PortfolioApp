from typing import Annotated, Union

from pydantic import Field, TypeAdapter

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

event_adapter = TypeAdapter(Event)
