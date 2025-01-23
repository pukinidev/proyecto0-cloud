from fastapi import APIRouter
from app.models import user
from app.db.config import engine

router = APIRouter()

user.Base.metadata.create_all(bind=engine)