import os, sys
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.pool import StaticPool

from app.main import app
from app.database import Base, get_db
from app.models import task as task_model  # ensure Task is registered


# Use StaticPool to keep the same in-memory database across connections
SQLALCHEMY_DATABASE_URL = "sqlite://"

engine = create_engine(
    SQLALCHEMY_DATABASE_URL,
    connect_args={"check_same_thread": False},
    poolclass=StaticPool
)

TestingSessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine
)

# Create tables once for all tests
Base.metadata.create_all(bind=engine)


# Dependency override so app uses test DB
def override_get_db():
    db = TestingSessionLocal()
    try:
        yield db
    finally:
        db.close()

app.dependency_overrides[get_db] = override_get_db
client = TestClient(app)


def test_create_task_success():
    payload = {
        "title": "Test Task",
        "description": "A task created during tests",
        "status": "pending",
        "due_date": "2025-12-31T12:00:00"
    }
    resp = client.post("/tasks/", json=payload)
    assert resp.status_code in (200, 201)
    data = resp.json()
    assert data["title"] == payload["title"]
    assert data["description"] == payload["description"]
    assert "id" in data


def test_create_task_missing_title_returns_422():
    payload = {
        "description": "Missing title should fail",
        "status": "pending"
    }
    resp = client.post("/tasks/", json=payload)
    assert resp.status_code == 422


def test_create_task_invalid_status_returns_422():
    payload = {
        "title": "Bad Status",
        "status": "invalid_status"
    }
    resp = client.post("/tasks/", json=payload)
    assert resp.status_code == 422
