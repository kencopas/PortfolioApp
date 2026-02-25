from functools import lru_cache
from collections import defaultdict
from typing import DefaultDict, Callable, List, Type

from sqlalchemy.orm import Session

from app.core.logger import get_logger, GREEN, RESET
from app.domain.events.base import BaseEvent


EventHandler = Callable[[BaseEvent, Session], None]
logger = get_logger("Event Bus")


class EventBus:
    """Singleton. Manages the publications and subscriptions to operational events.

    Registers event handlers to their respective event by event class type.
    Upon publication of an event, all registered handlers are executed and
    passed the event instance for context.
    """

    _handlers: DefaultDict[Type[BaseEvent], List[EventHandler]]

    def __init__(self):
        """Initializes an EventBus with an empty mapping of handlers."""
        self._handlers = defaultdict(list)

    def publish(self, event: BaseEvent, db: Session) -> None:
        """Publishes an instance of BaseEvent child class, executing all registered handlers"""
        event_type = type(event)
        event_type_repr = f"{GREEN}{event_type.__name__}{RESET}"

        if event_type not in self._handlers:
            logger.warning(
                f"Event with no registered handlers was published ({event_type_repr}). Ignoring."
            )
            return

        for handler in self._handlers[event_type]:
            logger.info(f"Handling {event_type_repr} event...")
            handler(
                event=event,
                db=db,
            )

    def subscribe(self, event: Type[BaseEvent]) -> None:
        """Subscribes a handler function to it's respective BaseEvent child class type.

        The handler function should conform to `Callable[[BaseEvent, Session], None]`.

        Example useage:
        ```
        class ExampleEvent(BaseEvent):
            ...

        bus = EventBus()

        @bus.subscribe(ExampleEvent)
        def example_handler(event: ExampleEvent, db: Session) -> None:
            ...
        ```
        """

        def wrapper(handler: EventHandler):
            """Register handler function, return original function without change"""
            self._handlers[event].append(handler)
            return handler

        return wrapper


@lru_cache(maxsize=1)
def get_event_bus() -> EventBus:
    return EventBus()
