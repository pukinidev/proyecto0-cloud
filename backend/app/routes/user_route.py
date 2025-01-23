from fastapi import APIRouter
from app.models import user
from app.db.config import engine

router = APIRouter()

@router.get("/")
def read_root():
    return {"Hello": "World"}