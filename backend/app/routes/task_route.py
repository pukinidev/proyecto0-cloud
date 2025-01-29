from fastapi import APIRouter
from app.models import task
from app.schemas.task_schema import TaskSchema
from fastapi import Depends, HTTPException
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.services.auth_service import auth_dependency
from app.services.task_service import create, get_tasks_by_user_id, get_task_by_id, delete

task = APIRouter()


@task.post("/")
async def create_task(task: TaskSchema, current_user: auth_dependency, db: Session = Depends(get_db)):
    task = create(db, task, current_user.id)
    return {
        "message": "Task created successfully",
        "task": task,
        "user": current_user.username
    }


@task.get("/")
async def get_tasks(current_user: auth_dependency, db: Session = Depends(get_db)):
    tasks = get_tasks_by_user_id(db, current_user.id)
    return tasks


@task.get("/{task_id}")
async def get_task(task_id: int, db: Session = Depends(get_db)):
    task = get_task_by_id(db, task_id)
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    return task


@task.delete("/{task_id}")
async def delete_task(task_id: int, current_user: auth_dependency,db: Session = Depends(get_db)):
    task = delete(db, task_id)
    return {
        "message": "Task deleted successfully",
        "task": task,
        "user": current_user.username
    }
