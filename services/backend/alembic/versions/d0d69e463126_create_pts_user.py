"""Create PTS user

Revision ID: d0d69e463126
Revises: e33a8930ab69
Create Date: 2026-02-23 09:00:36.933152

"""

from typing import Sequence, Union
import os

from alembic import op
import app.domain.models


# revision identifiers, used by Alembic.
revision: str = "d0d69e463126"
down_revision: Union[str, Sequence[str], None] = "8248031a8484"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade():
    db_name = os.getenv("POSTGRES_DB")
    pts_user = os.getenv("POSTGRES_PTS_USER")
    pts_password = os.getenv("POSTGRES_PTS_PASSWORD")

    if not all([db_name, pts_user, pts_password]):
        raise RuntimeError("Required PTS role environment variables not set")

    # Create role if it does not exist
    op.execute(
        f"""
    DO $$
    BEGIN
        IF NOT EXISTS (
            SELECT FROM pg_roles WHERE rolname = '{pts_user}'
        ) THEN
            CREATE ROLE {pts_user} LOGIN PASSWORD '{pts_password}';
        END IF;
    END
    $$;
    """
    )

    # Allow connection to database
    op.execute(f"GRANT CONNECT ON DATABASE {db_name} TO {pts_user};")

    # Allow schema usage
    op.execute(f"GRANT USAGE ON SCHEMA public TO {pts_user};")

    # Grant SELECT and INSERT on published_events
    op.execute(
        f"""
        GRANT SELECT, INSERT
        ON TABLE published_events
        TO {pts_user};
    """
    )

    # Grant SELECT, INSERT, UPDATE on services
    op.execute(
        f"""
        GRANT SELECT, INSERT, UPDATE
        ON TABLE services
        TO {pts_user};
    """
    )

    # Grant SELECT, INSERT, UPDATE on deployments
    op.execute(
        f"""
        GRANT SELECT, INSERT, UPDATE
        ON TABLE deployments
        TO {pts_user};
    """
    )

    # Grant permissions on existing sequences
    op.execute(
        f"""
        GRANT USAGE
        ON ALL SEQUENCES IN SCHEMA public
        TO {pts_user};
    """
    )

    # Set default privileges for future tables
    op.execute(
        f"""
        ALTER DEFAULT PRIVILEGES IN SCHEMA public
        GRANT SELECT, INSERT ON TABLES TO {pts_user};
    """
    )

    op.execute(
        f"""
        ALTER DEFAULT PRIVILEGES IN SCHEMA public
        GRANT USAGE ON SEQUENCES TO {pts_user};
    """
    )

    # Revoke unsafe public access
    op.execute("REVOKE ALL ON SCHEMA public FROM PUBLIC;")


def downgrade():
    pts_user = os.getenv("POSTGRES_PTS_USER")

    if not pts_user:
        raise RuntimeError("POSTGRES_PTS_USER not set")

    # Revoke privileges
    op.execute(f"REVOKE ALL PRIVILEGES ON ALL TABLES IN SCHEMA public FROM {pts_user};")
    op.execute(
        f"REVOKE ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public FROM {pts_user};"
    )
    op.execute(f"DROP ROLE IF EXISTS {pts_user};")
