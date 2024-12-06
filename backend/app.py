import threading

import webview
from flask import Flask, render_template

app = Flask(__name__)


@app.route("/")
def index():
    return render_template("index.html")


def start_server():
    app.run(host="127.0.0.1", port=5000, debug=False)


if __name__ == "__main__":
    server = threading.Thread(target=start_server)
    server.daemon = True
    server.start()

    window = webview.create_window(
        "Music Player", "http://127.0.0.1:5000", width=1024, height=768
    )

    webview.start(debug=False)
