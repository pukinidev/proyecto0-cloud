from fastapi import APIRouter
from app.models import category
from app.db.config import engine

router = APIRouter()

category.Base.metadata.create_all(bind=engine)