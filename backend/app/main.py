from fastapi import FastAPI
from fastapi.responses import RedirectResponse
from app.db.base import Base
from app.db.session import engine
from app.routes import user_route, task_route, category_route, auth_route

app = FastAPI(
    title="Tasks API",
    description="A simple task manager API",
    version="0.1",
    docs_url="/",
    redoc_url=None
)

# Create the database tables

Base.metadata.create_all(bind=engine)

# Create the routes of the app

app.include_router(user_route.router, prefix="/user")
app.include_router(task_route.router, prefix="/task")
app.include_router(category_route.router, prefix="/category")
app.include_router(auth_route.router, prefix="/auth")

@app.get("/")
def read_root():
    return RedirectResponse(url="/docs")

