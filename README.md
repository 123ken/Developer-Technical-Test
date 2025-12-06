# Developer Technical Test

Simple FastAPI + SQLite backend and a Vite + React (TypeScript) frontend.  
Backend seeds 5 tasks on startup and exposes CRUD endpoints for tasks. Frontend includes a simple task creation UI.

## Repository layout
- app/ — FastAPI backend
  - main.py — application entry (creates tables, seeds DB, mounts routers)
  - database.py — SQLAlchemy engine / Session / Base
  - seed_db.py — seeds initial tasks on startup
  - models/ — SQLAlchemy models (task)
  - controllers/ — DB access & logic
  - routers/ — FastAPI routes (task endpoints)
- frontend/ — Vite + React TypeScript app
  - src/App.tsx — simple task create UI + card display
- tests/ — pytest tests for API endpoints

## Requirements
- macOS (commands below use zsh)
- Python 3.10+ (project uses Poetry)
- Node.js 16+ (for frontend; adjust to your environment)

## Backend — Setup & run (Poetry)
From project root:
1. Install dependencies
```bash
poetry install
```

2. Run development server
```bash
poetry run uvicorn app.main:app --reload
```
- Server listens by default on http://127.0.0.1:8000
- On startup the app will create DB tables and seed 5 tasks (see `app/seed_db.py`).

## Frontend — Setup & run
```bash
cd frontend
npm install
npm run dev
```
- open the dev server on http://localhost:5173

## API Endpoints (base: /)
- GET /  
  - Returns a simple welcome message.

- Tasks (prefix: /tasks)
  - GET /tasks/  
    - Get list of tasks. Query params: skip, limit.
  - POST /tasks/  
    - Create a task. JSON body example:
      {
        "title": "My task",
        "description": "desc",
        "status": "pending",
        "due_date": "2025-12-31T12:00:00"
      }

FastAPI automatic docs:
- Swagger UI: http://127.0.0.1:8000/docs
- ReDoc: http://127.0.0.1:8000/redoc

## Testing
Tests use pytest and an in-memory SQLite DB. When running via Poetry, set PYTHONPATH so the `app` package is importable.

Run all tests:
```bash
poetry run env PYTHONPATH="$PWD" pytest -q
```


## Useful commands
- Start backend
  - poetry run uvicorn app.main:app --reload
- Start frontend
  - cd frontend && npm run dev
- Run tests
  - poetry run env PYTHONPATH="$PWD" pytest -q
