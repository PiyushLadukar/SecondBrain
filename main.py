'''
print("welcome to SecondBrain")
name = input("Enter your name : ")
print("hello",name)
age = input("enter your age : ")
domain = input("Enter your tech : ")
print ("The user datail are : ", name,age,domain)
'''
notes = ["Learn Python", "Build AI","Linkedin","Github"]

def add_note():

    note = input("Enter your note: ")

    with open("notes.txt", "a") as file:
        file.write(note + "\n")

    print("Note added successfully")


def view_notes():

    with open("notes.txt", "r") as file:

        notes = file.readlines()

        if len(notes) == 0:
            print("No notes found")

        else:
            print("\nYour Notes:\n")

            for index, note in enumerate(notes):
                print(f"{index + 1}. {note.strip()}")


def search_notes():

    keyword = input("Enter keyword to search: ")

    with open("notes.txt", "r") as file:

        notes = file.readlines()

        found = False

        print("\nSearch Results:\n")

        for note in notes:

            if keyword.lower() in note.lower():
                print(note.strip())
                found = True

        if not found:
            print("No matching notes found")


def delete_note():

    with open("notes.txt", "r") as file:
        notes = file.readlines()

    if len(notes) == 0:
        print("No notes available")
        return

    print("\nYour Notes:\n")

    for index, note in enumerate(notes):
        print(f"{index + 1}. {note.strip()}")

    choice = int(input("\nEnter note number to delete: "))

    if 1 <= choice <= len(notes):

        notes.pop(choice - 1)

        with open("notes.txt", "w") as file:
            file.writelines(notes)

        print("Note deleted successfully")

    else:
        print("Invalid note number")


while True:

    print("\n===== SecondBrain =====")
    print("1. Add Note")
    print("2. View Notes")
    print("3. Search Notes")
    print("4. Delete Note")
    print("5. Exit")

    choice = input("Enter your choice: ")

    if choice == "1":
        add_note()

    elif choice == "2":
        view_notes()

    elif choice == "3":
        search_notes()

    elif choice == "4":
        delete_note()

    elif choice == "5":
        print("Exiting SecondBrain...")
        break

    else:
        print("Invalid choice")
        