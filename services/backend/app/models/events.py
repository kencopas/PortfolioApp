"""SQLAlchemy ORM models for all incoming events (deployments, service events, etc.)"""

import uuid
from enum import Enum
from typing import Any
from datetime import datetime

from sqlalchemy import Enum as SAEnum
from sqlalchemy import String, DateTime, func
from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy.dialects.postgresql import JSONB, UUID

from app.db.base import Base


class DeploymentStatus(str, Enum):
    STARTED = "started"
    SUCCESS = "success"
    FAILED = "failed"


class IngestedEvent(Base):
    __tablename__ = "ingested_events"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True)
    service_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), nullable=True)
    deployment_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), nullable=True)
    event_type: Mapped[str] = mapped_column(String(128), nullable=True)
    received_at: Mapped["datetime"] = mapped_column(
        DateTime(timezone=True), server_default=func.now()
    )
    payload: Mapped[dict[str, Any] | None] = mapped_column(JSONB, nullable=False)


class Service(Base):
    __tablename__ = "services"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True)
    name: Mapped[str] = mapped_column(String(64), nullable=False, unique=True)
    status: Mapped[str] = mapped_column(String(32), nullable=False)
    description: Mapped[str] = mapped_column(String(256), nullable=True)
    created_at: Mapped["datetime"] = mapped_column(
        DateTime(timezone=True), server_default=func.now()
    )
    retired_at: Mapped["datetime"] = mapped_column(
        DateTime(timezone=True), nullable=True
    )


class Deployment(Base):
    __tablename__ = "deployments"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True)
    image_tag: Mapped[str] = mapped_column(String(7), nullable=False)
    status: Mapped[DeploymentStatus] = mapped_column(
        SAEnum(DeploymentStatus, name="deployment_status_enum"), nullable=False
    )
    started_at: Mapped["datetime"] = mapped_column(
        DateTime(timezone=True), nullable=False
    )
    finished_at: Mapped["datetime"] = mapped_column(
        DateTime(timezone=True), nullable=True
    )
