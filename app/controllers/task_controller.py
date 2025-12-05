from sqlalchemy.orm import Session
from app.models.task import Task
from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class TaskCreate(BaseModel):
    title: str
    description: Optional[str] = None
    status: str
    due_date: datetime

class TaskResponse(TaskCreate):
    id: int

    class ConfigDict:
        from_attributes = True


def create_task(db: Session, task: TaskCreate):
    db_task = Task(
    title=task.title,
    description=task.description,
    status=task.status,
    due_date=task.due_date,
    )
    db.add(db_task)
    db.commit()
    db.refresh(db_task)
    return db_task