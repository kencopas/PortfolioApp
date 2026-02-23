"""Add pgcrypto Extension

Revision ID: 1424e418cf2f
Revises: 4bb4124c8435
Create Date: 2026-02-23 13:14:38.652219

"""

from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
import app.models


# revision identifiers, used by Alembic.
revision: str = "1424e418cf2f"
down_revision: Union[str, Sequence[str], None] = "d0d69e463126"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    op.execute("CREATE EXTENSION IF NOT EXISTS pgcrypto;")


def downgrade() -> None:
    """Downgrade schema."""
    op.execute("DROP EXTENSION IF EXISTS pgcrypto;")
