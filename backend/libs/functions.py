import base64
import os

from libs.constants import FILE_FORMATS


def list_music_in_folder(folder_path: str) -> list:
    files = []

    for dirpath, _, filenames in os.walk(folder_path):
        for file in filenames:
            if file.split(".")[-1] in FILE_FORMATS:
                files.append(os.path.join(dirpath, file))

    return files


def get_audio(file_path: str):
    try:
        with open(file_path, "rb") as f:
            audio_bytes = f.read()
            base64_audio = base64.b64encode(audio_bytes).decode("utf-8")

            return base64_audio
    except Exception as e:
        print(e)
        return None
