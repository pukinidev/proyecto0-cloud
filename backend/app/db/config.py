from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

DATABASE_URL_SQLITE = "sqlite:///./db.db"

DATABASE_URL = "postgresql://postgres:postgres@database:5432/postgres"

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

