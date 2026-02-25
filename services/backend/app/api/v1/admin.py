from fastapi import APIRouter
from fastapi.responses import FileResponse

router = APIRouter(prefix="/admin")


@router.get("")
def admin_console():
    return FileResponse("app/static/admin.html")
