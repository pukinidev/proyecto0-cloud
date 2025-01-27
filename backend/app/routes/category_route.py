from typing import Annotated
from fastapi import APIRouter, Depends
from app.models import category
from app.db.session import engine, get_db
from app.schemas.category_schema import CategorySchema
from sqlalchemy.orm import Session
from app.schemas.user_schema import UserSchema
from app.services.auth_service import get_current_active_user
from app.services.category_service import create, get_all, delete

category = APIRouter()


@category.post("/")
async def create_category(category: CategorySchema,current_user: Annotated[UserSchema, Depends(get_current_active_user)], db: Session = Depends(get_db)):
    category = create(db, category)
    return {
        "message": "Category created successfully",
        "category": category.name,
        "user": current_user.username
    }


@category.get("/")
async def get_categories(db: Session = Depends(get_db)):
    categories = get_all(db)
    return categories


@category.delete("/{category_id}")
async def delete_category(category_id: int, current_user: Annotated[UserSchema, Depends(get_current_active_user)] ,db: Session = Depends(get_db)):
    deleted_category = delete(db, category_id=category_id)
    return {
        "message": "Category deleted successfully",
        "category": deleted_category.name,
        "user": current_user.username
    }


