from pydantic import BaseModel
from datetime import datetime
from app.models.task import Status


class TaskSchema(BaseModel):
    title: str
    description: str
    creation_date: datetime
    finish_date: datetime
    status: Status
    category_id: int

    class Config:
        from_attributes = True


class TaskDB(TaskSchema):
    id: int

