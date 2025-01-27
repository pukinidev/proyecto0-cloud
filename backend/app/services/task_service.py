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
