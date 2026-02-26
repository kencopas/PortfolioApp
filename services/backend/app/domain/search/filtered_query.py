from typing import Optional
from datetime import datetime

from pydantic import BaseModel


class FilteredQueryRequest(BaseModel):
    limit: Optional[int] = 100
    after: Optional[datetime] = None
    before: Optional[datetime] = None
    event_type: Optional[str] = None
