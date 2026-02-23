from __future__ import annotations

from typing import Annotated, Union

from pydantic import Field, TypeAdapter

from app.schemas.events import EventUnion

event_adapter = TypeAdapter(EventUnion)
