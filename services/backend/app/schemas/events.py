from enum import Enum
from typing import List, Dict, Optional

from pydantic import BaseModel


class DeploymentStatus(str, Enum):
    STARTED = "started"
    SUCCESS = "success"
    FAILED = "failed"


class Event(BaseModel):
    id: int
    event_type: str
    service_id: int
    deployment_id: int
