import logging
import sys
from logging.config import dictConfig
from app.core.config import settings


YELLOW = "\033[33m"
RED = "\033[31m"
RESET = "\033[0m"
GREEN = "\033[32m"
BLUE = "\033[36m"


class LevelColorFormatter(logging.Formatter):
    """
    Custom formatter that:
    - Pads level name to fixed width
    - Pads logger name to fixed width
    - Colors WARNING (yellow) and ERROR/CRITICAL (red)
    """

    LEVEL_WIDTH = 8  # fits CRITICAL
    LOGGER_WIDTH = 15  # adjust as needed

    def format(self, record: logging.LogRecord) -> str:
        original_levelname = record.levelname

        padded_level = f"{original_levelname:<{self.LEVEL_WIDTH}}"

        if record.levelno == logging.WARNING:
            record.levelname = f"{YELLOW}{padded_level}{RESET}"
        elif record.levelno >= logging.ERROR:
            record.levelname = f"{RED}{padded_level}{RESET}"
        else:
            record.levelname = padded_level

        # Pad logger name
        record.name = f"{record.name:<{self.LOGGER_WIDTH}}"

        formatted = super().format(record)

        # Restore originals
        record.levelname = original_levelname
        record.name = record.name.strip()

        return formatted


def setup_logging() -> None:
    LOG_LEVEL = settings.log_level.upper()

    LOGGING_CONFIG = {
        "version": 1,
        "disable_existing_loggers": False,
        "formatters": {
            "colored": {
                "()": LevelColorFormatter,
                "format": "%(asctime)s | %(levelname)s | %(name)s | %(message)s",
                "datefmt": "%H:%M:%S",
            },
        },
        "handlers": {
            "console": {
                "class": "logging.StreamHandler",
                "formatter": "colored",
                "stream": sys.stdout,
            },
        },
        "root": {
            "level": LOG_LEVEL,
            "handlers": ["console"],
        },
    }

    dictConfig(LOGGING_CONFIG)


def get_logger(name: str) -> logging.Logger:
    return logging.getLogger(name)
