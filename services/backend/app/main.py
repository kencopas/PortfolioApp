from fastapi import FastAPI

import app.models
from app.api.routes import router


app = FastAPI()
app.include_router(router)
