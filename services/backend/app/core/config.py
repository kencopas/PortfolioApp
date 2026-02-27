from pathlib import Path
from typing import Annotated

from pydantic import SecretStr, PostgresDsn, Field
from pydantic_settings import BaseSettings, SettingsConfigDict


SERVICE_ROOT_DIR = Path(__file__).parent.parent.parent
ENV_FILE_PATH = SERVICE_ROOT_DIR / ".env"


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=ENV_FILE_PATH)

    log_level: str = "INFO"

    postgres_db: str
    postgres_pts_user: str
    postgres_pts_password: SecretStr
    pts_database_url: Annotated[PostgresDsn, Field(repr=False)]
    alembic_database_url: Annotated[PostgresDsn, Field(repr=False)]


settings = Settings()
