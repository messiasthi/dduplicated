#! /usr/bin/env python
import hashlib

def getHash(path):
	return getMD5(path)

def getMD5(path):
	try:
		hash_md5 = hashlib.md5()
		with open(path, "rb")  as f:
			for chunk in iter(lambda: f.read(4096), b""):
				hash_md5.update(chunk)

		return hash_md5.hexdigest()
	except:
		ignore.append(path)
		print("ERROR: You do not have perission to write files."
		+ "I sugest run this script with sudo or run chmod -R +w * "
		+ "the write permission is needed for get md5 hash, using hashlib.md5() "
		+ "the file is opened in write binary mode")
		return None
