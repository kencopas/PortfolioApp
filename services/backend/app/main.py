from fastapi import FastAPI

import app.models
from app.api.router import router
import app.core.config


app = FastAPI()
app.include_router(router)
