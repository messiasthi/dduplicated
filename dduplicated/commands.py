from dduplicated import scans, fileManager

def detect(paths):
	return scans.scan(paths)

# Remove all duplicates
def delete(files):
	return fileManager.delete(files)

# Make the link to first file
def link(files):
	return fileManager.link(files)

# Print the help menu
def help():
	help = """
	dduplicate is a simple script in python for detect and delete duplicate files in your directory
	finded duplicated files, is possible delete, link or do nothing.
	Command:
	\tdetect\tPATHS\tfor only search and detect duplicated files in directory.
	\tdelete\tPATHS\tfor delete any duplicated files in directory, not first file.
	\tlink\tPATHS\tfor link first all duplicates in first file.
	\thelp\t\tshow this help
	"""
	print(help)
