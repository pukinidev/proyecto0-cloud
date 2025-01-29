from typing import Annotated
from fastapi import APIRouter
from app.models import task
from app.db.session import engine
from app.schemas.task_schema import TaskSchema, TaskSchemaResponse
from fastapi import Depends
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.schemas.user_schema import UserSchema
from app.services.auth_service import get_current_active_user
from app.services.task_service import create, get_tasks_by_user_id

task = APIRouter()

@task.post("/")
async def create_task(task: TaskSchema, current_user: Annotated[UserSchema, Depends(get_current_active_user)],db: Session = Depends(get_db)):
    task = create(db, task, current_user.username)
    return {
        "message": "Task created successfully",
        "task": task,
        "user": current_user.username
    }

@task.get("/")
async def get_tasks(current_user: Annotated[UserSchema, Depends(get_current_active_user)], db: Session = Depends(get_db)):
    tasks = get_tasks_by_user_id(db, current_user.id)
    return tasks


@task.put("/{task_id}")
async def update_task(task_id: int):
    return {"message": "Task updated successfully"}

@task.delete("/{task_id}")
async def delete_task(task_id: int):
    return {"message": "Task deleted successfully"}
