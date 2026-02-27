from typing import Annotated, Union

from pydantic import Field

from .deployment import DeploymentFailed, DeploymentFinished, DeploymentStarted
from .service import ServiceFailed, ServiceStarted, ServiceStopped


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
