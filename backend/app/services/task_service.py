from sqlalchemy.orm import Session
from app.schemas.task_schema import TaskSchema
from app.models.task import Task
from app.services.user_service import get_user_id_by_username


def create(db: Session, task: TaskSchema, username: str):
    user_id = get_user_id_by_username(db, username)
    db_task = Task(
        **task.model_dump(),
        user_id=user_id,
    )
    db.add(db_task)
    db.commit()
    db.refresh(db_task)
    return db_task

def get_tasks_by_user_id(db: Session, user_id: int):
    return db.query(Task).filter(Task.user_id == user_id).all()


def update(db: Session, task_id: int, task: TaskSchema):
    db_task = db.query(Task).filter(Task.id == task_id).first()
    db_task.title = task.title
    db_task.description = task.description
    db.commit()
    db.refresh(db_task)
    return db_task

def delete(db: Session, task_id: int):
    task = db.query(Task).filter(Task.id == task_id).first()
    db.delete(task)
    db.commit()
    return task
