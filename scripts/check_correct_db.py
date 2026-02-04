"""Algorithm to check the database entries are correct.

This script follows the next steps in this order:
    1. Loads the whole database as a python dictionary.
    2. Checks for each entry if it has all the default keys.
    3. Adds any missing default keys and values to any entry that requires them.
    4. Overwrites the original database.
"""

import json
from pathlib import Path

BASE_ENTRIES = {
    "name": "",
    "lang": [""],
    "tech": [""],
    "descr": "",
    "repo": "",
    "post": "",
}
PROJECTS_DB_PATH = Path().resolve().parent / "docs" / "projects_db.json"


def check_db_entries():
    with open(PROJECTS_DB_PATH, "r", encoding="utf-8") as db:
        entries = json.load(db)

    for entry in entries:
        for key, val in BASE_ENTRIES.items():
            if key not in entry:
                entry[key] = val

    with open(PROJECTS_DB_PATH, "w", encoding="utf-8") as db:
        json.dump(entries, db, indent=2)


if __name__ == "__main__":
    check_db_entries()
