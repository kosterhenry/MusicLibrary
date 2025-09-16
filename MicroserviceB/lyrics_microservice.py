from flask import Flask, request, jsonify
import requests

app = Flask(__name__)

LYRICS_API_URL = "https://api.lyrics.ovh/v1/"


@app.route("/get-lyrics", methods=["GET"])
def get_lyrics():
    title = request.args.get("title")
    artist = request.args.get("artist")

    if not title or not artist:
        return jsonify({"error": "Title and artist parameters are required."}), 400

    response = requests.get(f"{LYRICS_API_URL}{artist}/{title}")

    if response.status_code == 200:
        return jsonify(response.json())
    else:
        return jsonify({"error": "Lyrics not found."}), 404


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5002, debug=True)