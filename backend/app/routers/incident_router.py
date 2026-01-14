from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app import models, schemas
from app.database import get_db

router = APIRouter(
    prefix="/incidents",
    tags=["Incidents"]
)

@router.post("/", response_model=schemas.IncidentOut)
def create_incident(incident: schemas.IncidentCreate, db: Session = Depends(get_db)):
    try:
        new_incident = models.Incident(**incident.dict())
        db.add(new_incident)
        db.commit()
        db.refresh(new_incident)
        return new_incident
    except Exception as e:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(e)
        )

@router.get("/", response_model=list[schemas.IncidentOut])
def get_all_incidents(db: Session = Depends(get_db)):
    return db.query(models.Incident).all()

