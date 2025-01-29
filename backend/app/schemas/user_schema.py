from pydantic import BaseModel

class UserSchema(BaseModel):
    username: str
    password: str
    profile_picture: str  | None = None
    disabled: bool | None = None
    
    class Config:
        from_attributes = True
        
class UserDB(UserSchema):
    id: int
    class Config:
        from_attributes = True
        


