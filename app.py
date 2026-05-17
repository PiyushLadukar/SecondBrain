from fastapi import FastAPI
from sqlalchemy.orm import Session

from database import SessionLocal, engine
from models import Base, Note

app = FastAPI()

Base.metadata.create_all(bind=engine)


@app.get("/")
def home():

    return {
        "message": "Welcome to SecondBrain API"
    }


@app.post("/notes")
def add_note(note: str):

    db: Session = SessionLocal()

    new_note = Note(content=note)

    db.add(new_note)
    db.commit()
    db.refresh(new_note)

    return {
        "message": "Note added successfully",
        "note": new_note.content
    }


@app.get("/notes")
def get_notes():

    db: Session = SessionLocal()

    notes = db.query(Note).all()

    return notes


@app.delete("/notes/{note_id}")
def delete_note(note_id: int):

    db: Session = SessionLocal()

    note = db.query(Note).filter(Note.id == note_id).first()

    if not note:
        return {
            "error": "Note not found"
        }

    db.delete(note)
    db.commit()

    return {
        "message": "Note deleted successfully"
    }