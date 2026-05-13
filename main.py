'''
print("welcome to SecondBrain")
name = input("Enter your name : ")
print("hello",name)
age = input("enter your age : ")
domain = input("Enter your tech : ")
print ("The user datail are : ", name,age,domain)
'''
notes = ["Learn Python", "Build AI","Linkedin","Github"]

while True :
     
 note = input("Enter your note :- ")
 with open("notes.txt","a") as file:
    file.write(note + "\n")

 if len(notes)==0:
     print("no notes available")
 else:
     for note in notes:
      print(note)


 print("3. Exit")
