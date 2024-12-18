from typing import Any

from mutagen.easyid3 import EasyID3
from mutagen.id3 import ID3
from mutagen.mp3 import MP3


def get_tag(file_path: str):
    try:
        audio = EasyID3(file_path)

        return {
            "title": audio["title"],
            "artist": audio["artist"],
            "album": audio["album"],
            "date": audio["date"],
            "duration": audio["length"],
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
