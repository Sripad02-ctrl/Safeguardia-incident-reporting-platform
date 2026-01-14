# app/schemas.py
from pydantic import BaseModel, EmailStr
from typing import Optional

class OrgCreate(BaseModel):
    name: str

class UserCreate(BaseModel):
    email: EmailStr
    password: str

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class IncidentCreate(BaseModel):
    category: str
    type: str
    title: str
    description: str
    place: Optional[str] = None
    
class IncidentOut(IncidentCreate):
    id: int

    class Config:
        orm_mode = True