from app.models.task import Task
from datetime import datetime
from app.database import SessionLocal

def seed_db():
    db = SessionLocal()
    try:
        # Check if database is empty before adding tasks
        if db.query(Task).count() == 0:
            tasks = [
                Task(title="Task 1", description="Description for task 1", status="pending", due_date=datetime.now()),
                Task(title="Task 2", description="Description for task 2", status="pending", due_date=datetime.now()),
                Task(title="Task 3", description="Description for task 3", status="pending", due_date=datetime.now()),
                Task(title="Task 4", description="Description for task 4", status="pending", due_date=datetime.now()),
                Task(title="Task 5", description="Description for task 5", status="pending", due_date=datetime.now()),
            ]
            db.add_all(tasks)
            db.commit()
            print("Successfully seeded 5 tasks.")
    finally:
        db.close()