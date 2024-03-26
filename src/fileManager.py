import os
import stat

def _delete(path: str, src: str, symbolic_link: bool, verbose=False):
    if verbose:
        print("Delete the file: {}".format(path))

    os.remove(path)

    if symbolic_link:
        if verbose:
            print("Create symbolic link from {} to {}".format(path, src))

        os.symlink(src, path)


def manager_files(paths, symbolic_link=False, verbose=False):
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
                _delete(path, src, symbolic_link, verbose)
                deleted_files.append(path)

                if symbolic_link:
                    linked_files.append(path)

        else:
            errors.append("Not identified by file: \"{}\"".format(path))

    return {"preserved": src, "linked_files": linked_files, "deleted_files": deleted_files, "errors": errors}


# Try The Voight-Kampff if you not recognize if is a replicant or not, all is suspect
def manager(duplicates, create_link=False, verbose=False):
    if len(duplicates) == 0:
        # Return empty list object
        return []

    processed_files = []
    for files_by_hash in duplicates.values():
        processed_files.append(manager_files(
            files_by_hash, create_link, verbose))

    return processed_files


def delete(duplicates, verbose=False):
    return manager(duplicates, False, verbose)


def link(duplicates, verbose=False):
    return manager(duplicates, True, verbose)


def _getEmptyDirs(path: str):
    dirs = []
    for (root, directories, files) in os.walk(path, True):
        if len(directories) > 0:
            for directory in directories:
                current = os.path.join(root, directory)
                if len(os.listdir(current)) > 0:
                    dirs = dirs + _getEmptyDirs(current)
                else:
                    print("Append directory: " + os.path.abspath(current))
                    dirs.append(current)

    return dirs


def rrmdir(path:str):
    removed = []
    if os.path.isdir(os.path.abspath(path)):
        dirs = list(dict.fromkeys(_getEmptyDirs(path)))
        for d in dirs:
            try:
                removed.append(os.path.abspath(d))
                print("Remove: " + os.path.abspath(d))
                os.chmod(d, stat.S_IWUSR);
                os.removedirs(d)
            except ValueError:
                print(ValueError)
    return removed
