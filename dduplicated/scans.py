from os import path as opath, walk

from dduplicated import hashs

ignored = ['..']
files = {}
visited = []

def add_file(path):
	global files
	if not opath.islink(path):
		file_hash = hashs.get_hash(path)
		if file_hash in files:
			if path not in files[file_hash]:
				files[file_hash].append(path)
		else:
			files.update({file_hash: [path]})

def scan_dir(path):
	global visited
	if not opath.islink(path) and path not in ignored and path not in visited:
		visited.append(path)
		for (root, directories, files) in walk(path, True):
			for d in directories:
				scan_dir(opath.join(root, d))

			for f in files:
				add_file(opath.join(root, f))
			

def scan(paths):
	for path in paths:
		scan_dir(path)

	duplicates = {}
	# Clear files without duplicates
	for (file_hash, paths) in files.items():
		if len(paths) > 1:
			paths.sort()
			duplicates[file_hash] = paths
	return duplicates
