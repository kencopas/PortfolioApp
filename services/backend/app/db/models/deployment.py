"""Deployment-related ORM models"""

import uuid
from datetime import datetime

from sqlalchemy import Enum as SAEnum
from sqlalchemy import String, DateTime
from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy.dialects.postgresql import UUID

from app.db.models.base import Base
from app.domain.enums import DeploymentStatus


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
