from typing import Any

from mutagen.easyid3 import EasyID3


def get_tag(file_path: str):
    try:
        audio = EasyID3(file_path)

        return {
            "title": audio["title"][0],
            "artist": audio["artist"][0],
            "album": audio["album"][0],
            "date": audio["date"][0],
            "duration": int(audio["length"][0]),
        }

    except Exception as e:
        return {"error": str(e)}


def get_album_cover(mp3_file: Any | None) -> Any | None:
    try:
        audio = EasyID3(mp3_file)
        print("\n------TAGS---------")
        print(dict(audio))
        print("-------------------")

        return None
    except Exception as e:
        print(f"Error extracting album cover: {e}")

    return None
