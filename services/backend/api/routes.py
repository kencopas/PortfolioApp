from fastapi import APIRouter

from .users.routes import router as users_router


router = APIRouter()
router.include_router(users_router)


@router.get("/")
def root():
    return {'message': 'Hello from PortfolioApp API!'}


@router.get("/health")
def health():
    return {'status': 'healthy'}
