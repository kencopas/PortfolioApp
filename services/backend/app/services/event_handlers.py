from sqlalchemy.orm import Session

from app.models.events import Deployment
from app.schemas.deployment_events import DeploymentStarted

from .event_bus import get_event_bus


bus = get_event_bus()


@bus.subscribe(DeploymentStarted)
def create_deployment(event: DeploymentStarted, db: Session):


    deployment_model = Deployment(
        event_id=
    )
