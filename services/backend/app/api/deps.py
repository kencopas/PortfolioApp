"""API dependencies injected at runtime (event service, database connection, etc.)"""

from typing import Generator

from fastapi import Depends
from sqlalchemy.orm import Session

from app.db.session import SessionLocal
from app.services.event_bus import get_event_bus, EventBus
from app.services.event_ingestion import IngestionService
from app.repositories.deployment_repository import DeploymentRepository
from app.repositories.event_log_repository import EventLogRepository


def get_db() -> Generator[Session, None, None]:
    """Request-scoped, self-closing sqlalchemy database session"""
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


def get_deployment_repository(db: Session = Depends(get_db)):
    """Request-scoped deployment repository"""
    return DeploymentRepository(db)


def get_event_log_repository(db: Session = Depends(get_db)):
    """Request-scoped event log repository"""
    return EventLogRepository(db)


def get_ingestion_service(
    deployments: DeploymentRepository = Depends(get_deployment_repository),
    event_log: EventLogRepository = Depends(get_event_log_repository),
    bus: EventBus = Depends(get_event_bus),
) -> None:
    """Request-scoped ingestion service with repository and event bus access"""
    return IngestionService(
        deployments=deployments,
        event_log=event_log,
        bus=bus,
    )
