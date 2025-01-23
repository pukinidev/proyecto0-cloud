from fastapi import APIRouter
from app.api.routes import user_route, task_route, category_route

router = APIRouter()

router.include_router(user_route.router, prefix="/user", tags=["user"])
router.include_router(task_route.router, prefix="/task", tags=["task"])
router.include_router(category_route.router, prefix="/category", tags=["category"])

