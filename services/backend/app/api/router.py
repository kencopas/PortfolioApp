from fastapi import APIRouter

from .v1.events import router as events_router


router = APIRouter()
router.include_router(events_router)


@router.get("/")
def root():
    return {"message": "Hello from the PortfolioApp Platform Telemetry API!"}


@router.get("/health")
def health():
    return {"status": "healthy"}
