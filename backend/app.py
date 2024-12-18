import base64
import os
import threading
from argparse import ArgumentParser

import webview
from flask import Flask, render_template, request
from flask_cors import CORS
from libs.audio import get_album_cover, get_tag
from libs.functions import get_audio, list_music_in_folder

app = Flask(__name__)
CORS(app, origins=["*"])

parser = ArgumentParser()
parser.add_argument(
    "--dev",
    action="store_true",
    help="Run the app in development mode.",
    required=False,
)
args = parser.parse_args()


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/read")
def read():
    try:
        file_path = request.args.get("path")

        audio_data = get_audio(file_path)

        return {
            "path": file_path,
            "audio": audio_data,
        }

    except Exception as e:
        return {"error": str(e)}


@app.get("/files")
def files():
    files = list_music_in_folder(request.args.get("folder"))
    res = []

    for index, file in enumerate(files):
        album_cover_img = get_album_cover(file)
        base64_album_cover_img = (
            base64.b64encode(album_cover_img).decode("utf-8") if album_cover_img else ""
        )

        res.append(
            {
                "id": index,
                "path": file,
                "name": str(os.path.basename(file)).split(".")[0],
                "tag": get_tag(file),
                "album_cover": base64_album_cover_img,
            }
        )

    return {"data": res}


def start_server():
    app.run(host="127.0.0.1", port=5000, debug=False)


if __name__ == "__main__":
    if args.dev:
        start_server()
    else:
        server = threading.Thread(target=start_server)
        server.daemon = True
        server.start()

        window = webview.create_window(
            "Music Player",
            "http://127.0.0.1:5000",
            width=1024,
            height=768,
        )

        webview.start(debug=False)
