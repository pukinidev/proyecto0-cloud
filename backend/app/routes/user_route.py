from fastapi import APIRouter
from app.models import user
from app.db.session import engine

router = APIRouter()

@router.get("/")
def read_root():
    return {"Hello": "World"}