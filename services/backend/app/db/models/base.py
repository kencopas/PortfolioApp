from sqlalchemy.orm import DeclarativeBase

from app.core.logger import BLUE, RESET


class Base(DeclarativeBase):
    def __str__(self) -> str:
        return f"{BLUE}<{type(self).__name__} id={'None' if not hasattr(self, 'id') else str(self.id)[:5]}>{RESET}"
