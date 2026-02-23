from typing import Annotated, Union

from pydantic import Field

from .deployment_events import DeploymentFailed, DeploymentFinished, DeploymentStarted
from .service_events import ServiceFailed, ServiceStarted, ServiceStopped


EventUnion = Annotated[
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
