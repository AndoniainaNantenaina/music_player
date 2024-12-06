import os

from libs.constants import FILE_FORMATS


def list_music_in_folder(folder_path: str) -> list:
    files = []

    for dirpath, dirnames, filenames in os.walk(folder_path):
        for file in filenames:
            if file.split(".")[-1] in FILE_FORMATS:
                files.append(os.path.join(dirpath, file))

    # for file in os.listdir(folder_path):
    #     if file.split(".")[-1] in FILE_FORMATS:
    #         files.append(os.path.join(folder_path, file))

    return files
