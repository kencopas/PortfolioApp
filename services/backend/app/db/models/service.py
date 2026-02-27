"""Service-related ORM models"""

import uuid
from datetime import datetime

from sqlalchemy import String, DateTime, func
from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy.dialects.postgresql import UUID

from app.db.models.base import Base


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
