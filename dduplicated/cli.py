# The client of DDuplicated tool.
from os import path as opath, getcwd
from pprint import pprint
from sys import argv

from dduplicated import commands


def get_paths(params):
    paths = []
    for param in params:
        path = opath.join(getcwd(), param)
        if opath.exists(path) and opath.isdir(path) and not opath.islink(path):
            paths.append(path)

    return paths


def main():
    params = argv
    processed_files = []
    verbose = True

    # Remove the command name
    del params[0]
    paths = get_paths(params)

    if "no-verbose" in params:
        verbose = False

    if len(params) == 0 or "help" in params:
        commands.show_help()
        exit(0)

    elif "detect" in params:
        if len(paths) == 0:
            print("Paths is not valid")
            commands.show_help()
            exit(0)
        processed_files = commands.detect(paths, verbose)

    elif "delete" in params:
        if len(paths) == 0:
            print("Paths is not valid")
            commands.show_help()
            exit(0)
        processed_files = commands.delete(paths, verbose)

    elif "link" in params:
        if len(paths) == 0:
            print("Paths is not valid")
            commands.show_help()
            exit(0)
        processed_files = commands.link(paths, verbose)

    else:
        commands.show_help()
        exit(0)

    if len(processed_files) > 0:
        pprint(processed_files)
    else:
        print("No duplicates found")
        print("Great! Bye!")

    exit(0)


if __name__ == "__main__":
    main()
