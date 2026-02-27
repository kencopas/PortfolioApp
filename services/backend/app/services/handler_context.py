from app.repositories.deployment_repository import DeploymentRepository
from app.repositories.event_log_repository import EventLogRepository


class HandlerContext:
    """Context that provides each handler with access to each repository."""

    def __init__(
        self,
        deployments: DeploymentRepository,
        event_log: EventLogRepository,
    ):
        """Constructs a HandlerContext instance as a bundle or repositories"""
        self.deployments = deployments
        self.event_log = event_log
