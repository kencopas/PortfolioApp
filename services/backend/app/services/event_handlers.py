"""Registered event handlers for all incoming events"""

from datetime import datetime, timezone

from sqlalchemy.orm import Session

from app.domain.enums import DeploymentStatus
from app.domain.models.deployment import Deployment
from app.domain.events.deployment import (
    DeploymentStarted,
    DeploymentFinished,
    DeploymentFailed,
)

from app.core.logger import get_logger

from .event_bus import get_event_bus


bus = get_event_bus()
logger = get_logger("Event Handlers")


@bus.subscribe(DeploymentStarted)
def create_deployment(event: DeploymentStarted, db: Session):

    logger.info("Deployment creation initiated. Checking for existing deployment...")
    existing_deployment = db.get(Deployment, event.deployment_id)

    # Check for deployment existence
    if existing_deployment:
        logger.error(
            "Deployment already started; see conflict below.\n\n"
            f"Received event: {event}\n"
            f"Existing deployment: {existing_deployment}\n"
        )
        logger.warning("Ignoring event...")
        return

    # Create new deployment
    deployment = Deployment(
        id=event.deployment_id,
        image_tag=event.image_tag,
        status=DeploymentStatus.STARTED.value,
        started_at=event.occurred_at,
    )

    # Add and commit
    db.add(deployment)
    db.commit()


@bus.subscribe(DeploymentFinished)
def close_deployment(event: DeploymentFinished, db: Session):

    logger.info("Deployment closure initiated. Checking for existing deployment...")
    deployment = db.get(Deployment, event.deployment_id)

    # Check for deployment existence
    if not deployment:
        logger.error(f"No matching deployment for event: {event}")
        logger.warning("Ignoring event...")
        return

    # Update deployment status
    deployment.status = DeploymentStatus.SUCCESS.value
    deployment.finished_at = datetime.now(timezone.utc)

    # Commit updated deployment entry
    db.commit()
    db.refresh(deployment)

    logger.info(f"Deployment status updated successfully: {deployment}")


@bus.subscribe(DeploymentFailed)
def diagnose_deployment(event: DeploymentFailed, db: Session):

    logger.info(
        "Investigating deployment failure. See reason below.\n\n"
        f"Reason provided: {event.reason}\n"
    )
    deployment = db.get(Deployment, event.deployment_id)

    # Check for deployment existence
    if not deployment:
        logger.error(f"No matching deployment for event: {event}")
        logger.warning("Ignoring event...")
        return

    # Update deployment status
    deployment.status = DeploymentStatus.FAILED.value

    # Commit updated deployment entry
    db.commit()

    logger.info(f"Deployment status updated successfully: {deployment}")
