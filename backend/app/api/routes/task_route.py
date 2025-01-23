from fastapi import APIRouter
from app.models import task
from app.db.config import engine

router = APIRouter()

task.Base.metadata.create_all(bind=engine)