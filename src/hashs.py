import hashlib
import os


def get_hash(path):
	return get_md5(path)


# MD5 methods is based on second answer from: https://exceptionshub.com/get-md5-hash-of-big-files-in-python.html
def get_md5(path):
	hash_md5 = hashlib.md5()
	if os.path.isfile(path):
		with open(path, "rb") as file:
			while True:
				buffer = file.read(4096)
				if not buffer:
					break
				
				hash_md5.update(buffer)
	
		return hash_md5.hexdigest()
