import os

path = 'Fonts'
files = os.listdir(path)
list_Files = []
for f in files:
    #append the name of files in "Fonts" directory to a list
    list_Files.append(str(f))

#print all file names
print(list_Files)
