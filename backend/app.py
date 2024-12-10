import base64
import io
import os
import threading

import webview
from flask import Flask, render_template, request, send_file
from flask_cors import CORS
from libs.functions import get_tag, list_music_in_folder

app = Flask(__name__)
CORS(app, origins=["*"])


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/read")
def read():
    file_path = request.args.get("file")

    with open(file_path, "rb") as bites:
        return send_file(
            io.BytesIO(bites.read()),
            attachment_filename=os.path.basename(file_path),
            mimetype="audio/mpeg",
        )


@app.get("/files")
def files():
    files = list_music_in_folder(request.args.get("folder"))
    res = []

    try:
        print(request.args.get("folder"))

        for index, file in enumerate(files):
            with open(file, "rb") as f:
                audio_bytes = f.read()
                base64_audio = base64.b64encode(audio_bytes).decode("utf-8")

                res.append(
                    {
                        "id": index,
                        "path": file,
                        "audio_data": base64_audio,
                        "name": str(os.path.basename(file)).split(".")[0],
                        "tag": get_tag(file),
                    }
                )

    except Exception as e:
        res = {"error": str(e)}

    return {"data": res}


def start_server():
    app.run(host="127.0.0.1", port=5000, debug=False)


if __name__ == "__main__":
    start_server()
    # server = threading.Thread(target=start_server)
    # server.daemon = True
    # server.start()

    # window = webview.create_window(
    #     "Music Player",
    #     "http://127.0.0.1:5000",
    #     width=1024,
    #     height=768,
    # )

    # webview.start(debug=False)
