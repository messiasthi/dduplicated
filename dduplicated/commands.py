from dduplicated import scans, fileManager

def detect(paths):
	return scans.scan(paths)

# Remove all duplicates
def delete(files):
	fileManager.delete(files)
	exit(0)

# Make the link to first file
def link(files):
	fileManager.link(files)
	exit(0)

# Print the help menu
def help():
	print("dduplicate is a simple script in python for detect and delete duplicate files in your directory")
	print("finded duplicated files, is possible delete, link or do nothing.")
	print("Command:")
	print("\tdetect\tPATHS\tfor only search and detect duplicated files in directory.")
	print("\tdelete\tPATHS\tfor delete any duplicated files in directory, not first file.")
	print("\tlink\tPATHS\tfor link first all duplicates in first file.")
	print("\thelp\t\tshow this help")
