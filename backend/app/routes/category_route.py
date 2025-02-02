from typing import Annotated
from fastapi import APIRouter, Depends
from app.models import category
from app.db.session import engine, get_db
from app.schemas.category_schema import CategorySchema, CategoryResponseSchema
from sqlalchemy.orm import Session
from app.schemas.user_schema import UserDB
from app.services.auth_service import auth_dependency
from app.services.category_service import create, get_all, delete

category = APIRouter()


@category.post("/", response_model=CategoryResponseSchema)
async def create_category(category: CategorySchema,current_user: auth_dependency, db: Session = Depends(get_db)):
    category = create(db, category)
    return category


@category.get("/", response_model=list[CategoryResponseSchema])
async def get_categories(db: Session = Depends(get_db)):
    categories = get_all(db)
    return categories


@category.delete("/{category_id}", response_model=CategoryResponseSchema)
async def delete_category(category_id: int, current_user: auth_dependency,db: Session = Depends(get_db)):
    category = delete(db, category_id=category_id)
    return category


