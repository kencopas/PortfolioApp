"""Registered event handlers for all incoming events"""

from datetime import datetime, timezone

from sqlalchemy.orm import Session

from app.models.events import Deployment
from app.schemas.deployment_events import (
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

    logger.info("Checking for existing deployment...")
    existing_deployment = db.get(Deployment, event.deployment_id)

    # Check for deployment existence
    if existing_deployment:
        logger.error("DeploymentStarted event occurred for an existing deployment.")
        logger.warning("Ignoring DeploymentStarted event...")
        return

    # Create new deployment
    deployment = Deployment(
        id=event.deployment_id,
        image_tag=event.image_tag,
        status="started",
        started_at=event.occurred_at,
    )

    # Add and commit
    db.add(deployment)
    db.commit()


@bus.subscribe(DeploymentFinished)
def close_deployment(event: DeploymentFinished, db: Session):

    deployment = db.get(Deployment, event.deployment_id)

    # Check for deployment existence
    if not deployment:
        logger.error(
            "DeploymentFinished event occurred with no matching deployment on record."
        )
        logger.warning("Ignoring DeploymentFinished event...")
        return

    # Update deployment status
    deployment.status = "success"
    deployment.finished_at = datetime.now(timezone.utc)

    # Commit updated deployment entry
    db.commit()


@bus.subscribe(DeploymentFailed)
def diagnose_deployment(event: DeploymentFailed, db: Session):

    logger.info(f"DeploymentFailed event receieved with reason: {event.reason}")

    deployment = db.get(Deployment, event.deployment_id)

    # Check for deployment existence
    if not deployment:
        logger.error(
            "DeploymentFailed event occurred with no matching deployment on record."
        )
        logger.warning("Ignoring DeploymentFailed event...")
        return

    # Update deployment status
    deployment.status = "failed"

    # Commit updated deployment entry
    db.commit()
