"""Registered event handlers for all incoming events"""

from app.domain.event_bus import get_event_bus
from app.domain.events import (
    DeploymentStarted,
    DeploymentFinished,
    DeploymentFailed,
)

from app.core.logger import get_logger
from app.services.event_repository import EventRepository


bus = get_event_bus()
logger = get_logger("Event Handlers")


@bus.subscribe(DeploymentStarted)
def deployment_started(event: DeploymentStarted, repo: EventRepository):
    """Attempt to create a deployment for a DeploymentStarted event"""

    logger.info("Deployment creation initiated. Checking for existing deployment...")

    try:
        repo.create_deployment(
            deployment_id=event.deployment_id,
            image_tag=event.image_tag,
            started_at=event.occurred_at,
        )
    except ValueError:
        logger.exception("Attempted to start an existing deployment.")
        return
    except Exception:
        logger.exception("An unexpected error has occurred during deployment creation.")
        return

    logger.info("Deployment creation successful!")


@bus.subscribe(DeploymentFinished)
def deployment_finished(event: DeploymentFinished, repo: EventRepository):

    logger.info("Deployment closure initiated. Checking for existing deployment...")

    try:
        repo.close_deployment(event.deployment_id)
    except ValueError:
        logger.exception("Deployment closure attempted for non-existent deployment.")
        return
    except Exception:
        logger.exception("An unexpected error has occurred during deployment closure.")
        return

    logger.info("Deployment status updated successfully!")


@bus.subscribe(DeploymentFailed)
def deployment_failed(event: DeploymentFailed, repo: EventRepository):

    logger.info(
        "Investigating deployment failure. See reason below.\n\n"
        f"Reason provided: {event.reason}\n"
    )

    try:
        repo.fail_deployment(event.deployment_id)
    except ValueError:
        logger.exception("Deployment failure attempted for non-existent deployment.")
        return
    except Exception:
        logger.exception("An unexpected error has occurred during deployment failure.")
        return

    logger.info("Deployment status updated successfully!")
