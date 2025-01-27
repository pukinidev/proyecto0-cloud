from typing import Annotated
from fastapi import APIRouter, Depends
from app.models import category
from app.db.session import engine, get_db
from app.schemas.category_schema import CategorySchema
from sqlalchemy.orm import Session
from app.schemas.user_schema import UserSchema
from app.services.auth_service import get_current_active_user
from app.services.category_service import create

category = APIRouter()


@category.post("/")
async def create_category(category: CategorySchema,current_user: Annotated[UserSchema, Depends(get_current_active_user)], db: Session = Depends(get_db)):
    category = create(db, category)
    return category


@category.get("/")
async def get_categories():
    return {"message": "Categories retrieved successfully"}


@category.delete("/{category_id}")
async def delete_category(category_id: int):
    return {"message": "Category deleted successfully"}
