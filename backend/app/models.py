from sqlalchemy import Column, Integer, String, ForeignKey, Text
from .database import Base

class Organization(Base):
    __tablename__ = "organizations"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, nullable=False)

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String, nullable=False)
    org_id = Column(Integer, ForeignKey("organizations.id"))

class Incident(Base):
    __tablename__ = "incidents"
    id = Column(Integer, primary_key=True, index=True)
    category = Column(String)
    type = Column(String)
    title = Column(String)
    description = Column(Text)
    place = Column(String)
    image_url = Column(String, nullable=True)
    user_id = Column(Integer, ForeignKey("users.id"))