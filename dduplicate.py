#! /usr/bin/python
import os
import sys
import hashlib

actions = ['detect', 'delete', 'link', 'help', 'verbose']
paths = []
files = {}
duplicatedFiles = {}
param = ""
params = sys.argv
ignore = ['/', '..']
log = False

def getHash(path):
	if log:
		print(path)
	if path not in ignore:
		try:
			hash_md5 = hashlib.md5()
			with open(path, "rb")  as f:
				for chunk in iter(lambda: f.read(4096), b""):
					hash_md5.update(chunk)

			return hash_md5.hexdigest()
		except:
			ignore.append(path)
			print("You do not have perission to write files. I sugest run this script with sudo or run chmod -R +w *")
			print("the write permission is needed for get md5 hash, using hashlib.md5() the file is opened in write binary mode")
	return

# Add files to files dictionary
def addFile(path, hash):
	if hash in files:
		files[hash].append(path)
	else:
		files[hash] = [path]

# Detect files and subdirectories in directory
def searchFilesAndSubDirectories(pathsL):
	if log:
		print("detect")
		print(pathsL)

	for p in pathsL:
		if not os.path.islink(p):
			for (path, directories, files) in os.walk(p):
				for f in files:
					if f != scriptName:
						filePath = os.getcwd() + "/" + path + "/" + f
						if not os.path.islink(filePath):
							addFile(filePath, getHash(filePath))

				searchFilesAndSubDirectories(directories)

def detect():
	print(duplicatedFiles)

def delete():
	for hashs in duplicatedFiles:
		first = True
		for f in duplicatedFiles[hashs]:
			if first:
				first = False
			else:
				if log:
					print(f)
				os.remove(f)


def link():
	for hashs in duplicatedFiles:
		first = True
		scr = ""
		for f in duplicatedFiles[hashs]:
			if first:
				first = False
				src = f
			else:
				if log:
					print(f)
				os.remove(f)
				os.symlink(src, f)


def showHelp():
	print("dduplicate is a simple script in python for detect and delete duplicate files in your directory")
	print("finded duplicated files, is possible delete, link or do nothing.")
	print("dduplicate detect . is default action")
	print("Command:")
	print("\t--detect\tPATHS\tfor only search and detect duplicated files in directory.")
	print("\t--delete\tPATHS\tfor delete any duplicated files in directory, not first file.")
	print("\t--link\tPATHS\tfor link first all duplicates in first file.")
	print("\t--help\t\tshow this help")
	print("\t--verbose\t\tshow all actions and files paths searched")

def execAction():
	if param in actions:
		if param == "delete":
			delete()
		elif param == "link":
			link()
		elif param == "detect":
			detect()
		else:
			showHelp()
	else:
		detect()

scriptName = params[0]

# Remove the name of script file
params.remove(params[0])

# Define default action
if len(params) == 0:
	params.append('detect')

# Check if the first param is one of actions
# if params[0] in actions:
# 	param = params[0][:2]
# 	params.remove(params[0])

# Get paths to check
for value in params:
	print(value[2:])
	if value[2:] in actions:
		if value[2:] == 'verbose':
			log = True
		else:
			param = value[2:]
	else:
		paths.append(value)

# Check if action is help, in help action, do not needed run check of files
if param == 'help':
	execAction()
	exit(0)

# In paths empty, define the default directory to run check
if len(paths) == 0:
	paths.append('.')

searchFilesAndSubDirectories(paths)

# Ignore files can't be opened
if None in files:
	del files[None]

# Separete files duplicated from files with only one copy
for f in files:
	if len(files[f]) > 1:
		duplicatedFiles[f] = files[f]

execAction()

if log:
	print(paths)
	print(duplicatedFiles)

exit(0)
