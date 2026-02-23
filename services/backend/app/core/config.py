from pathlib import Path

from pydantic_settings import BaseSettings, SettingsConfigDict


SERVICE_ROOT_DIR = Path(__file__).parent.parent.parent
ENV_FILE_PATH = SERVICE_ROOT_DIR / ".env"


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=ENV_FILE_PATH)

    log_level: str = "INFO"


settings = Settings()
