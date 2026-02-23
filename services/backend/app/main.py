from fastapi import FastAPI

import app.models
from app.api.router import router


app = FastAPI()
app.include_router(router)
