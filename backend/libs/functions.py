import os

from libs.constants import FILE_FORMATS


def list_music_in_folder(folder_path: str) -> list:
    files = []

    for dirpath, _, filenames in os.walk(folder_path):
        for file in filenames:
            if file.split(".")[-1] in FILE_FORMATS:
                files.append(os.path.join(dirpath, file))

    return files
