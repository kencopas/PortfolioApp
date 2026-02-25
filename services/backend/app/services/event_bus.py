from functools import lru_cache
from collections import defaultdict
from typing import DefaultDict, Callable, List, Type

from sqlalchemy.orm import Session

from app.core.logger import get_logger
from app.schemas.base_event import BaseEvent


EventHandler = Callable[[BaseEvent, Session], None]
logger = get_logger(__file__)


class EventBus:
    _handlers: DefaultDict[Type[BaseEvent], List[EventHandler]]

    def __init__(self):
        self._handlers = defaultdict(list)

    def publish(self, event: BaseEvent, db: Session) -> None:
        event_type = type(event)

        if event_type not in self._handlers:
            logger.warning(
                f"Event with no registered handlers was published ({event_type}). Ignoring."
            )
            return

        for handler in self._handlers[event_type]:
            logger.info(f"Handling {event_type.__name__} event...")
            handler(
                event=event,
                db=db,
            )

    def subscribe(self, event: Type[BaseEvent]) -> None:
        """Subscribe to a `BaseEvent`"""

        def wrapper(handler: EventHandler):
            """Register handler function, return original function without change"""
            self._handlers[event].append(handler)
            return handler

        return wrapper


@lru_cache(maxsize=1)
def get_event_bus() -> EventBus:
    return EventBus()
