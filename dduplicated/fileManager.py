import os
from threading import Thread

def _delete(path):
	os.remove(path)

def _link(src, path):
	os.symlink(src, path)

def manager_files(paths, link):
	# The first file is preserved to not delete all files in directories.
	first = True
	src = ""
	deleted_files = []
	linked_files = []
	errors = []
	
	for path in paths:
		if os.path.isfile(path):
			if first:
				first = False
				src = path
			
			else:
				Thread(target=_delete, args=(path)).start()
				deleted_files.append(path)
				
				if link:
					Thread(target=_link, args=(src, path)).start()
					linked_files.append(path)
		else:
			errors.append("Not identified by file: \"{}\"".format(path))
	
	return {"preserved": src, "linked_files": linked_files, "deleted_files": deleted_files, "errors": errors}


# Try The Voight-Kampff if you not recognize if is a replicant or not, all is suspect
def manager(duplicates, create_link=False):
	if len(duplicates) == 0:
		return None
	
	processed_files = []
	for files_by_hash in duplicates.values():
		processed_files.append(manager_files(files_by_hash, create_link))
	
	return processed_files


def delete(duplicates):
	return manager(duplicates)



def link(duplicates):
	return manager(duplicates, True)
