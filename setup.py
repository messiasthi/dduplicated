from setuptools import setup, find_packages

setup(
	name="Krakenfiles",
	version="0.2",
	description='The helper to find and manager duplicates of files',
	url='https://github.com/tsdevvv/krakenfiles',
	author='Thiago Sousa',
	author_email='thiago.sousa08@outlook.com',
	packages=find_packages(),
	entry_points={
		'console_scripts': [
			"krakenfiles=src.cli:main"
		]
	}
)
