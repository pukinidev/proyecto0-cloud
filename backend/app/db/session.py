from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from app.db.settings import settings

engine = create_engine(settings.DB_URL, echo=True)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

