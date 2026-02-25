from enum import Enum


class DeploymentStatus(str, Enum):
    STARTED = "started"
    SUCCESS = "success"
    FAILED = "failed"
