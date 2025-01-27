from typing import Annotated
from fastapi import APIRouter
from app.models import task
from app.db.session import engine
from app.schemas.task_schema import TaskSchema
from fastapi import Depends
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.schemas.user_schema import UserSchema
from app.services.auth_service import get_current_active_user
from app.services.task_service import create

task = APIRouter()

@task.post("/")
async def create_task(task: TaskSchema, current_user: Annotated[UserSchema, Depends(get_current_active_user)],db: Session = Depends(get_db) ):
    task = create(db, task, current_user.username)
    return task

@task.get("/{user_id}/tasks")
async def get_tasks(user_id: int):
    return {"message": "Tasks retrieved successfully"}

@task.get("/{task_id}")
async def get_task(task_id: int):
    return {"message": "Task retrieved successfully"}

@task.put("/{task_id}")
async def update_task(task_id: int):
    return {"message": "Task updated successfully"}

@task.delete("/{task_id}")
async def delete_task(task_id: int):
    return {"message": "Task deleted successfully"}
