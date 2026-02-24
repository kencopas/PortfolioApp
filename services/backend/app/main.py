from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles

import app.models
from app.api.router import router
import app.core.config


app = FastAPI()

app.mount("/static", StaticFiles(directory="app/static"), name="static")
app.include_router(router)
