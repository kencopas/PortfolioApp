from enum import Enum
from datetime import datetime
from typing import List, Dict, Optional, Any

from pydantic import BaseModel


class DeploymentStatus(str, Enum):
    STARTED = "started"
    SUCCESS = "success"
    FAILED = "failed"


class EventSchema(BaseModel):
    id: int
    event_type: str
    service_id: int
    deployment_id: int
    occurred_at: datetime
    event_data: Optional[Dict[str, Any]] = None


class ServiceSchema(BaseModel):
    id: int
    name: str
    description: Optional[str] = None
    created_at: datetime
    retired_at: Optional[datetime] = None


class DeploymentSchema(BaseModel):
    id: int
    image_tag: str
    status: DeploymentStatus
    started_at: datetime
    finished_at: Optional[datetime] = None
