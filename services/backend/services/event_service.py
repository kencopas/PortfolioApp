from __future__ import annotations

from typing import Annotated, Union, List, Dict

from pydantic import Field, TypeAdapter

from models.base_event import BaseEvent
from models.deployment_events import (
    DeploymentFailed,
    DeploymentFinished,
    DeploymentStarted,
)
from models.service_events import ServiceFailure, ServiceStarted, ServiceStopped


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


_events: List[BaseEvent] = []


def handle_event(event_data: Dict) -> None:
    try:
        event = event_adapter.validate_python(event_data)
    except Exception as e:
        print(f"Error validating event data: {e}")
        raise ValueError() from e

    _events.append(event)


def search_events() -> List[BaseEvent]:
    return _events
