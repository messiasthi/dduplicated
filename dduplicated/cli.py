#! /usr/bin/env python
# The client of DDuplicated tool.
import sys
import os
from dduplicated import commands

def getPaths(params):
	paths = []
	for param in params:
		path = os.path.join(os.getcwd(), param)
		if os.path.exists(path) and os.path.isdir(path) and not os.path.islink(path):
			paths.append(path)

	return paths

def main():
	params = sys.argv

	# Remove the command name
	del params[0]

	if len(params) == 0 or "help" in params:
		commands.help()
	elif "detect" in params:
		duplicates = commands.detect(getPaths(params))
		if len(duplicates) < 1:
			print("No duplicates found")
			print("Great! Bye!")
			exit(0)

		for (key, values) in duplicates.items():
			print(key + " -> ");
			for value in values:
				print("\t\t\t\t\t" + value)

	elif "delete" in params:
		commands.delete(commands.detect(getPaths(params)))
	elif "link" in params:
		commands.link(commands.detect(getPaths(params)))
	else:
		commands.help()
	exit(0)
