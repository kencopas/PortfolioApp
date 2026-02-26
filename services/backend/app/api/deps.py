"""API dependencies injected at runtime (event service, database connection, etc.)"""

from typing import Generator

from fastapi import Depends
from sqlalchemy.orm import Session

from app.db.session import SessionLocal
from app.domain.event_bus import get_event_bus, EventBus
from app.services.event_ingestion import EventIngestionService


def get_db() -> Generator[Session, None, None]:
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


def get_ingestion_service(
    db: Session = Depends(get_db),
    bus: EventBus = Depends(get_event_bus),
) -> None:
    return EventIngestionService(db=db, bus=bus)
