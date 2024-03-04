# dduplicated

A python script to remove all duplicated files in your directories.

## Install
To install from source code use `python setup.py install`.

## Tests

You can use the directory `test/dirTest` for make your tests, I recommend copy the `dirTest` content for other directory and use the new directory for make any test you want.

## Help
dduplicate is a script in python for detect duplicated files in your finded directory, is possible delete, link or just detect.

`dduplicate detect .` is default action

```
Command:
	--detect	PATHS	for only search and detect duplicated files in directory.
	--delete	PATHS	for delete any duplicated files in directory, not first file.
	--link	    PATHS	for link first all duplicates in first file.
	--rmdir     PATHS   for remove all directories and subdirectories empty.
	--no-verbose		for not show all steps executed
	--help		show this help
```

## Contributions and bug report

All Pull Requests is appreciated! I be happy with any contribution.
