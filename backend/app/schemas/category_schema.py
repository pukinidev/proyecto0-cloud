from pydantic import BaseModel

class CategorySchema(BaseModel):
    name: str
    description: str
    class Config:
        from_attributes = True