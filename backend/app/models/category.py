import enum
from typing import List
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.models.base import ModelBase
from app.models.task import Task


class Category(ModelBase):
    __tablename__ = "category"
    
    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    name: Mapped[str] = mapped_column(index=True)
    description: Mapped[str]
    tasks: Mapped[List["Task"]] = relationship()