from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles

from app.core.logger import setup_logging
from app.api.router import router
import app.models  # Register SQLAlchemy ORM Models
import app.services.event_handlers  # Initialize Event Bus and Register Event Handlers


setup_logging()
app = FastAPI()

app.mount("/static", StaticFiles(directory="app/static"), name="static")
app.include_router(router)
