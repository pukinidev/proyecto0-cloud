from sqlalchemy.orm import Session
from app.models.category import Category
from app.schemas.category_schema import CategorySchema

def create(db: Session, category: CategorySchema):
    db_category = Category(**category.model_dump())
    db.add(db_category)
    db.commit()
    db.refresh(db_category)
    return db_category

def get_all(db: Session):
    return db.query(Category).all()

def delete(db: Session, category_id: int):
    category = db.query(Category).filter(Category.id == category_id).first()
    db.delete(category)
    db.commit()
    return category