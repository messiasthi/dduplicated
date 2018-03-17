#! /usr/bin/env python
import os
from dduplicated import hashs

ignored = [ '..' ]
files = {}
visited = []

def addFile(path):
	global files
	if not os.path.islink(path):
		hash = hashs.getHash(path)
		if hash in files:
			if path not in files[hash]:
				files[hash].append(path)
		else:
			files[hash] = [ path ]

def scanDir(path):
	global visited
	if not os.path.islink(path) and path not in ignored and path not in visited:
		visited.append(path)
		for (root, directories, files) in os.walk(path, True):
			for d in directories:
				scanDir(os.path.join(root, d))

			for f in files:
				addFile(os.path.join(root, f))

def scan(paths):
	for path in paths:
		scanDir(path)
	global files
	for (hash, paths) in files.items():
		if len(paths) < 2:
			del files[hash]
		else:
			files[hash].sort()
	return files
