#! /usr/bin/env python
from setuptools import setup, find_packages

setup(
	name="DDuplicate",
	version="1.0",
	description='The helper to find and manager duplicates of files',  # Required
	url='https://github.com/messiasthi/scopy',
	author='Thiago Messias',
	author_email='messiasthi@gmail.com',
	packages=find_packages(),
	entry_points={
		'console_scripts': [
			"dduplicated=dduplicated.cli:main"
		]
	}
)
