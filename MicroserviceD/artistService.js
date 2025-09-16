require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5003; // Default to 5003 if not set

app.use(cors());

app.get('/get-artist-info', async (req, res) => {
    const artist = req.query.artist;
    if (!artist) {
        return res.status(400).json({ error: "Artist name is required" });
    }

    try {
        // Fetch top 5 songs from iTunes API
        const response = await axios.get("https://itunes.apple.com/search", {
            params: { term: artist, entity: "musicTrack", limit: 5 }
        });

        if (!response.data.results.length) {
            return res.status(404).json({ error: "Artist information not found" });
        }

        const topSongs = response.data.results.map(song => song.trackName);

        res.json({
            artist: artist,
            bio: "Bio not available via iTunes API.",
            topSongs
        });

    } catch (error) {
        console.error("Error fetching artist info:", error);
        res.status(500).json({ error: "Failed to fetch artist information" });
    }
});

app.listen(PORT, () => {
    console.log(`Artist microservice running on port ${PORT}`);
});