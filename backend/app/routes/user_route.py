from fastapi import APIRouter
from app.models import user
from app.db.session import engine

user = APIRouter()

@user.post("/register")
async def register():
    return {"message": "User registered successfully"}

@user.post("/login")
async def login():
    return {"message": "User logged in successfully"}

@user.post("/logout")
async def logout():
    return {"message": "User logged out successfully"}

@user.post("/refresh-token")
async def refresh_token():
    return {"message": "Token refreshed successfully"}

@user.get("/profile")
async def profile():
    return {"message": "User profile retrieved successfully"}

