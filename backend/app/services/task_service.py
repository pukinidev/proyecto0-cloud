from sqlalchemy.orm import Session
from app.schemas.task_schema import TaskSchema
from app.models.task import Task


def create(db: Session, task: TaskSchema, user_id: int):
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

def get_task_by_id(db: Session, task_id: int):
    return db.query(Task).filter(Task.id == task_id).first()


def delete(db: Session, task_id: int):
    task = db.query(Task).filter(Task.id == task_id).first()
    db.delete(task)
    db.commit()
    return task
