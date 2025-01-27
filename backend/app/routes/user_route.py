from fastapi import APIRouter
from jwt import InvalidTokenError
import jwt
from datetime import timedelta
from typing import Annotated
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from app.models import user
from app.schemas.token_schema import Token, TokenData
from app.services.auth import create_access_token, get_current_active_user
from app.services.user_service import authenticate_user, create_user, get_user
from app.core.settings import settings
from app.db.session import get_db
from sqlalchemy.orm import Session
from app.schemas.user_schema import UserSchema


user = APIRouter()

@user.post("/register", response_model=UserSchema)
async def register(user: UserSchema, db: Session = Depends(get_db)):
    if get_user(db, user.username):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Username already registered"
        )
    user = create_user(db, user)
    return user
    
@user.post("/login")
async def login(
    form_data: Annotated[OAuth2PasswordRequestForm, Depends()],
    db: Session = Depends(get_db)
) -> Token:
    user = authenticate_user(db, form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=float(settings.ACCESS_TOKEN_EXPIRE_MINUTES))
    access_token = create_access_token(
        data={"sub": user.username}, expires_delta=access_token_expires
    )
    return Token(access_token=access_token, token_type="bearer")

@user.get("/profile", response_model=UserSchema)
async def profile(
    current_user: Annotated[UserSchema, Depends(get_current_active_user)],
):
    return current_user

@user.post("/logout")
async def logout():
    return {"message": "User logged out successfully"}

@user.post("/refresh-token")
async def refresh_token():
    return {"message": "Token refreshed successfully"}


