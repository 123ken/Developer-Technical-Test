from fastapi import FastAPI
from app.database import Base, engine
from app.routers.task import router as task_router

Base.metadata.create_all(bind=engine)

app = FastAPI()

app.include_router(task_router)

@app.get("/")
def read_root():
    return {"message": "Hello, FastAPI!"}