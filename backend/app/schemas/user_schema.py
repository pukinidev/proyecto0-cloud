from pydantic import BaseModel

class UserSchema(BaseModel):
    username: str
    password: str
    profile_picture: str
    
    class Config:
        orm_mode = True
        

