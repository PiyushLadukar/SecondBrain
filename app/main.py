from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session

from database import (
    SessionLocal,
    engine,
    Base
)

from models import User

from schemas import UserCreate

from auth import (
    hash_password,
    verify_password,
    create_access_token
)

app = FastAPI()

Base.metadata.create_all(bind=engine)


def get_db():

    db = SessionLocal()

    try:
        yield db

    finally:
        db.close()


@app.get("/")
def home():

    return {
        "message": "Welcome to SecondBrain API"
    }


@app.post("/signup")
def signup(
    user: UserCreate,
    db: Session = Depends(get_db)
):

    existing_user = db.query(User).filter(
        User.username == user.username
    ).first()

    if existing_user:

        return {
            "error": "Username already exists"
        }

    hashed_password = hash_password(
        user.password
    )

    new_user = User(
        username=user.username,
        password=hashed_password
    )

    db.add(new_user)

    db.commit()

    return {
        "message": "User created successfully"
    }


@app.post("/login")
def login(
    user: UserCreate,
    db: Session = Depends(get_db)
):

    db_user = db.query(User).filter(
        User.username == user.username
    ).first()

    if not db_user:

        return {
            "error": "Invalid username"
        }

    valid_password = verify_password(
        user.password,
        db_user.password
    )

    if not valid_password:

        return {
            "error": "Invalid password"
        }

    token = create_access_token(
        data={
            "sub": user.username
        }
    )

    return {
        "access_token": token,
        "token_type": "bearer"
    }