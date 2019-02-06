from os import path as opath, walk, sep, remove, symlink
from threading import Thread
from pprint import pprint

from dduplicated import hashs

ignored = ['..']
files = {}
visited = []
analysed = []
verbose = False
delete = False
link = False


def _delete_file(file: str, link_path: str):
    global verbose, link
    if verbose:
        print("Delete the file: {}".format(file))

    # Delete file
    remove(file)
    # Create a symbolic link link if necessary
    if link and len(link_path) > 0:
        if verbose:
            print("Create symbolic link from {} to {}".format(link_path, file))
        symlink(link_path, file)


def add_file(path):
    global files, analysed, verbose, delete
    if not opath.islink(path) and path not in analysed:
        file_hash = hashs.get_hash(path)
        # Check if the file_hash already analysed and if the path already exists in list referenced to hash
        if file_hash in files:
            analysed.append(path)
            obj = {"path": path, "duplicated": True, "original": files[file_hash][0]}

            if delete:
                obj.update({"deleted": delete, "link": link})
                Thread(target=_delete_file, args=(path, files[file_hash][0])).start()

            if verbose:
                pprint(obj)

            files[file_hash].append(obj)
        else:
            analysed.append(path)
            files.update({file_hash: [path]})


def scan_dir(path):
    global visited, verbose
    if not opath.islink(path) and path not in ignored and path not in visited:
        visited.append(path)
        for (root, directories, dir_files) in walk(path, True):
            for d in directories:
                if verbose:
                    print("Analyse the directory: {}{}{}".format(root, sep, d))
                scan_dir(opath.join(root, d))

            for f in dir_files:
                if verbose:
                    print("Analyse the file: {}{}{}".format(root, sep, f))
                add_file(opath.join(root, f))


def scan(paths, del_files=False, create_link=False, verb=False):
    global verbose, delete, link
    verbose = verb
    delete = del_files
    link = create_link
    for path in paths:
        scan_dir(path)

    duplicates = {}
    # Clear files without duplicates
    for (file_hash, paths) in files.items():
        if verbose:
            print("Prepare print for this hash {}".format(file_hash))
        if len(paths) > 1:
            duplicates[file_hash] = paths
    return duplicates
