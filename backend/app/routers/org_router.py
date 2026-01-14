from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.models import Organization
from app.schemas import OrgCreate
from app.database import get_db

router = APIRouter()

@router.post("/orgs")
def create_org(org: OrgCreate, db: Session = Depends(get_db)):
    new_org = Organization(name=org.name)
    db.add(new_org)
    db.commit()
    db.refresh(new_org)
    return new_org