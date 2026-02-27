from uuid import UUID
from datetime import datetime, timezone

from sqlalchemy.orm import Session

from app.core.logger import get_logger
from app.db.models.deployment import Deployment
from app.domain.enums import DeploymentStatus


logger = get_logger("Deployment Repo")


class DeploymentRepository:
    """Handles database interaction for deployment updates"""

    def __init__(self, db: Session):
        """Creates a deployment repository with a database connection"""
        self._db = db

    def create_deployment(
        self, deployment_id: UUID, image_tag: str, started_at: datetime
    ) -> None:
        """Create a deployment

        Raises:
            ValueError: If a deployment with the same `deployment_id` already exists
        """

        existing_deployment = self._db.get(Deployment, deployment_id)
        if existing_deployment:
            raise ValueError(
                f"\nDeployment with deployment_id {deployment_id} already started:\n\n"
                f"Existing deployment: {existing_deployment}\n"
            )

        # Create new deployment
        deployment = Deployment(
            id=deployment_id,
            image_tag=image_tag,
            status=DeploymentStatus.STARTED.value,
            started_at=started_at,
        )

        # Add and commit
        self._db.add(deployment)
        self._db.commit()

    def close_deployment(self, deployment_id: UUID) -> None:
        """Close a deployment

        Raises:
            ValueError: If no deployment exists with a matching deployment id
        """

        # Check for deployment existence
        deployment = self._db.get(Deployment, deployment_id)
        if not deployment:
            raise ValueError(
                f"No existing deployment with deployment id: {deployment_id}"
            )

        # Update deployment status
        deployment.status = DeploymentStatus.SUCCESS.value
        deployment.finished_at = datetime.now(timezone.utc)

        # Commit updated deployment entry
        self._db.commit()

    def fail_deployment(self, deployment_id: UUID) -> None:
        """Update a deployment status to failed

        Raises:
            ValueError: If no deployment exists with a matching deployment id
        """

        # Check for deployment existence
        deployment = self._db.get(Deployment, deployment_id)
        if not deployment:
            raise ValueError(
                f"No existing deployment with deployment id: {deployment_id}"
            )

        # Update deployment status
        deployment.status = DeploymentStatus.FAILED.value

        # Commit updated deployment entry
        self._db.commit()
