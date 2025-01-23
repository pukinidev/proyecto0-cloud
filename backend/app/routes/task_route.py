from fastapi import APIRouter
from app.models import task
from app.db.session import engine

task = APIRouter()

@task.post("/")
async def create_task():
    return {"message": "Task created successfully"}

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
