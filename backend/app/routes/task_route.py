from fastapi import APIRouter
from app.models import task
from app.schemas.task_schema import TaskResponseSchema, TaskSchema, TaskUpdateSchema
from fastapi import Depends, HTTPException
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.services.auth_service import auth_dependency
from app.services.task_service import create, get_tasks_by_user_id, get_task_by_id, delete, update

task = APIRouter(
    
)


@task.post("/", response_model=TaskResponseSchema)
async def create_task(task: TaskSchema, current_user: auth_dependency, db: Session = Depends(get_db)):
    if task.finish_date < task.creation_date:
        raise HTTPException(status_code=400, detail="Finish date must be greater than creation date")
    task = create(db, task, current_user.id)
    return task


@task.get("/", response_model=list[TaskResponseSchema])
async def get_tasks(current_user: auth_dependency, db: Session = Depends(get_db)):
    tasks = get_tasks_by_user_id(db, current_user.id)
    return tasks


@task.get("/{task_id}", response_model=TaskResponseSchema)
async def get_task(task_id: int, db: Session = Depends(get_db)):
    task = get_task_by_id(db, task_id)
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    return task

@task.put("/{task_id}", response_model=TaskResponseSchema)
async def update_task(task_id: int, task: TaskUpdateSchema,current_user: auth_dependency, db: Session = Depends(get_db)):
    task = update(db, task_id, task)
    return task


@task.delete("/{task_id}", response_model=TaskResponseSchema)
async def delete_task(task_id: int, current_user: auth_dependency,db: Session = Depends(get_db)):
    task = delete(db, task_id)
    return task
