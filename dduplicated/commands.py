from dduplicated import scans, fileManager


def detect(paths, verbose=False):
	return scans.scan(paths, False, False, verbose)


# Remove all duplicates
def delete(files, verbose=False):
	return scans.scan(files, True, False, verbose)


# Make the link to first file
def link(files, verbose=False):
	return scans.scan(files, True, True, verbose)

def rmdir(paths):
    dirs = []
    for path in paths:
        dirs += fileManager.rrmdir(path)
    return dirs

# Print the help menu
def show_help():
	print("""
	dduplicate is a simple script in python for detect and delete duplicate files in your directory
	finded duplicated files, is possible delete, link or do nothing.
	Command:
	\tdetect\tPATHS\tfor only search and detect duplicated files in directory.
	\tdelete\tPATHS\tfor delete any duplicated files in directory, not first file.
	\tlink\tPATHS\tfor link first all duplicates in first file.
	\trmdir\tPATHS\tfor remove all directories and subdirectories empty.
	\tno-verbose\t\tfor not show all steps executed
	\thelp\t\tshow this help
	""")
