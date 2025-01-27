import os
from dotenv import load_dotenv

load_dotenv()

class Settings:
    DB_HOST = os.getenv('DB_HOST', 'database')
    DB_PORT = os.getenv('DB_PORT', 5432)
    DB_USER = os.getenv('DB_USER', 'postgres')
    DB_PASSWORD = os.getenv('DB_PASSWORD', 'postgres')
    DB_NAME = os.getenv('DB_NAME', 'postgres')
    DB_URL = f"postgresql://{DB_USER}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}"
    DB_URL_SQLITE = "sqlite:///./db.db"
    SECRET_KEY = os.getenv('SECRET_KEY', 'my_secret_key')
    ALGORITHM = os.getenv('ALGORITHM', 'HS256')
    ACCESS_TOKEN_EXPIRE_MINUTES = os.getenv('ACCESS_TOKEN_EXPIRE_MINUTES', 30)
    
settings = Settings()