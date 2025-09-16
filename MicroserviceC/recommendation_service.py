from flask import Flask, request, jsonify
import random

app = Flask(__name__)

# Sample database of songs (you can replace this with an actual dataset)
SONG_DATABASE = [
    {"title": "Garden of Eden", "artist": "Lady Gaga", "album": "Mayhem", "genre": "Pop"},
    {"title": "Anxiety", "artist": "Doechii", "album": "Single", "genre": "Rap"},
    {"title": "Denial is a River", "artist": "Doechii", "album": "Alligator Bites Never Heal", "genre": "Rap"},
    {"title": "Blinding Lights", "artist": "The Weeknd", "album": "After Hours", "genre": "Pop"},
    {"title": "Levitating", "artist": "Dua Lipa", "album": "Future Nostalgia", "genre": "Pop"},
    {"title": "As It Was", "artist": "Harry Styles", "album": "Harry's House", "genre": "Pop"},
    {"title": "Shake It Off", "artist": "Taylor Swift", "album": "1989", "genre": "Pop"},
    {"title": "Sicko Mode", "artist": "Travis Scott", "album": "Astroworld", "genre": "Rap"},
    {"title": "God's Plan", "artist": "Drake", "album": "Scorpion", "genre": "Rap"},
    {"title": "Take Five", "artist": "Dave Brubeck", "album": "Time Out", "genre": "Jazz"},
    {"title": "So What", "artist": "Miles Davis", "album": "Kind of Blue", "genre": "Jazz"},
    {"title": "Sweater Weather", "artist": "The Neighbourhood", "album": "I Love You.", "genre": "Indie"},
    {"title": "Fluorescent Adolescent", "artist": "Arctic Monkeys", "album": "Favourite Worst Nightmare",
     "genre": "Indie"}
]






@app.route('/recommendations', methods=['POST'])
def recommend_songs():
    try:
        data = request.json
        songs = data.get("songs", [])

        if not songs:
            return jsonify({"error": "No songs provided"}), 400

        # Step 1: Extract genres from received songs
        received_genres = set(song["genre"] for song in songs)

        # Step 2: Filter SONG_DATABASE to find matching songs
        matching_songs = [song for song in SONG_DATABASE if song["genre"] in received_genres]

        # Step 3: Pick up to 10 recommendations
        recommendations = random.sample(matching_songs, min(10, len(matching_songs)))

        return jsonify(recommendations)

    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5004, debug=True)