from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.models import User
from app.schemas import UserCreate, UserLogin
from app.auth import hash_password, verify_password, create_access_token

router = APIRouter()

@router.post("/auth/login")
def login(data: UserLogin, db: Session = Depends(get_db)):
    print(f"\n🔐 Attempting login for email: {data.email}")
    user = db.query(User).filter(User.email == data.email).first()
    
    if not user:
        print("❌ User not found in DB")
        raise HTTPException(status_code=401, detail="Invalid credentials")

    print(f"✅ Found user: {user.email}")
    print(f"📦 Entered password: {data.password}")
    print(f"🧂 Stored hash: {user.hashed_password}")

    is_valid = verify_password(data.password, user.hashed_password)
    print(f"🔍 Password valid? {is_valid}")

    if not is_valid:
        print("❌ Password mismatch during login")
        raise HTTPException(status_code=401, detail="Invalid credentials")

    token = create_access_token({"sub": user.username})
    print("✅ Token generated and login successful\n")
    return {"access_token": token, "token_type": "bearer"}