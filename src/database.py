import sqlite3
from sqlite3 import Error
import tempfile


def InitializeDatabase():
    try:
        file, filename = tempfile.mkstemp()
        print(file, filename)
        connection = sqlite3.connect(filename)
        print("Created connection")
        cursor = connection.cursor()
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS duplicates (
                id integer PRIMARY KEY,
                path text,
                file_name text,
                file_id text);
            """)

        return connection
    except Error as e:
        print(e)
        return None
