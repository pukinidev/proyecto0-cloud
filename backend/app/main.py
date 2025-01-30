from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import RedirectResponse
from fastapi.security import OAuth2PasswordBearer
from app.models.base import ModelBase
from app.db.session import engine
from app.routes import user_route, task_route, category_route

app = FastAPI(
    title="Tasks API",
    version="0.1",
    docs_url="/",
    redoc_url=None
)

# Create the database tables

ModelBase.metadata.create_all(bind=engine)

# Create the routes of the app

app.include_router(user_route.user, prefix="/users",
                   tags=["User"])

app.include_router(task_route.task, prefix="/tasks", tags=["Task"])
app.include_router(category_route.category,
                   prefix="/categories", tags=["Category"])


# Add CORS middleware

origins = [
    "http://localhost:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/", include_in_schema=False)
def read_root():
    return RedirectResponse(url="/docs")
