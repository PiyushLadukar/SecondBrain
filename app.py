from fastapi import FastAPI

app = FastAPI()

notes = []


@app.get("/")
def home():

    return {
        "message": "Welcome to SecondBrain API"
    }


@app.get("/notes")
def get_notes():

    return {
        "notes": notes
    }


@app.post("/notes")
def add_note(note: str):

    notes.append(note)

    return {
        "message": "Note added successfully",
        "notes": notes
    }


@app.delete("/notes/{note_id}")
def delete_note(note_id: int):

    if 0 <= note_id < len(notes):

        deleted_note = notes.pop(note_id)

        return {
            "message": "Note deleted successfully",
            "deleted_note": deleted_note,
            "notes": notes
        }

    return {
        "error": "Invalid note ID"
    }