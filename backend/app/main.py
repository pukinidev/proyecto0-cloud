from fastapi import FastAPI
from app.db.base import Base
from app.db.config import engine
from app.api.router import router

app = FastAPI()



@app.get("/")
def read_root():
    return {"Hello": "World"}

