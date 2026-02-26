"""Raw event persistence ORM models"""

import uuid
from typing import Any
from datetime import datetime

from sqlalchemy import String, DateTime, func
from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy.dialects.postgresql import JSONB, UUID

from app.db.models.base import Base


class PlatformEvent(Base):
    __tablename__ = "platform_events"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True)
    service_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), nullable=True)
    deployment_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), nullable=True)
    event_type: Mapped[str] = mapped_column(String(128), nullable=True)
    received_at: Mapped["datetime"] = mapped_column(
        DateTime(timezone=True), server_default=func.now()
    )
    payload: Mapped[dict[str, Any] | None] = mapped_column(JSONB, nullable=False)
