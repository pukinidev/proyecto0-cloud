from typing import List
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.models.task import Task
from .base import ModelBase

class User(ModelBase):
    __tablename__ = "user"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    username: Mapped[str] = mapped_column(unique=True, index=True)
    password: Mapped[str]
    profile_picture: Mapped[str] = mapped_column(default="default.jpg")
    disabled: Mapped[bool] = mapped_column(default=False)
    tasks: Mapped[List["Task"]] = relationship()
    