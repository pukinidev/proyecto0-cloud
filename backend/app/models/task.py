import enum
from sqlalchemy.orm import Mapped, mapped_column, relationship, DeclarativeBase
from sqlalchemy import ForeignKey, Integer
from app.db.base import Base
from datetime import datetime

class Status(enum.Enum):
    pending = "pending"
    done = "done"
    in_progress = "in_progress"
    completed = "completed"

class Task(Base):
    __tablename__ = "task"
    
    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    title: Mapped[str] = mapped_column(index=True)
    description: Mapped[str]
    creation_date: Mapped[datetime] = mapped_column(default=datetime.now())
    finish_date: Mapped[datetime]
    status: Mapped[Status] = mapped_column(default=Status.pending)
    user_id: Mapped[int] = mapped_column(ForeignKey("user.id"))
    
    