#! /usr/bin/env python
import os

def managerFiles(paths, link):
	first = True
	src = ""
	for path in paths:
		if first:
			first = False
			src = path
			print("PRESERVED: The file preserved is: \"" + path + "\"")

		else:
			os.remove(path)
			print("DELETE: File deleted: \"" + path + "\"")

			if link:
				os.symlink(src, path)
				print("LINK: Created link: \"" + path + "\" -> \"" + src + "\"")


# Try The Voight-Kampff if you not recognize if is a replicant or not, all is suspect
def manager(duplicates, createLink = False):
	if len(duplicates) < 1:
		print("No duplicates found")
		print("Great! Bye!")
		exit(0)

	for filesByHash in duplicates.values():
		managerFiles(filesByHash, createLink)


def delete(duplicates):
	manager(duplicates)

def link(duplicates):
	manager(duplicates, True)
