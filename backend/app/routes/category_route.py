from fastapi import APIRouter
from app.models import category
from app.db.session import engine

category = APIRouter()

@category.post("/")
async def create_category():
    return {"message": "Category created successfully"}

@category.get("/")
async def get_categories():
    return {"message": "Categories retrieved successfully"}

@category.delete("/{category_id}")
async def delete_category(category_id: int):
    return {"message": "Category deleted successfully"}


