from os import path as opath, walk

from dduplicated import hashs

ignored = [ '..' ]
files = {}
visited = []

def addFile(path):
	global files
	if not opath.islink(path):
		hash = hashs.getHash(path)
		if hash in files:
			if path not in files[hash]:
				files[hash].append(path)
		else:
			files.update({hash: [path]})

def scanDir(path):
	global visited
	if not opath.islink(path) and path not in ignored and path not in visited:
		visited.append(path)
		for (root, directories, files) in walk(path, True):
			for d in directories:
				scanDir(opath.join(root, d))

			for f in files:
				addFile(opath.join(root, f))

def scan(paths):
	for path in paths:
		scanDir(path)

	duplicates = {}
	# Clear files without duplicates
	for (hash, paths) in files.items():
		if len(paths) > 1:
			paths.sort()
			duplicates[hash] = paths
	return duplicates
