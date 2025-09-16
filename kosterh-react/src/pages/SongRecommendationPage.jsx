import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SongRecommendationPage() {
    const [musics, setMusics] = useState([]);
    const [recommendedSongs, setRecommendedSongs] = useState([]);
    const navigate = useNavigate();

    const loadMusic = async () => {
        const response = await fetch('/musics');
        const data = await response.json();
        console.log("Fetched musics:", data);
        setMusics(data);
    };

    const getRecommendations = async () => {
        if (musics.length === 0) return;  // Ensure we have songs before sending them

        const response = await fetch('/recommendations', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ songs: musics })
        });

        if (response.ok) {
            const recommendations = await response.json();
            console.log("Received recommendations:", recommendations);
            setRecommendedSongs(recommendations);
        } else {
            console.error("Failed to get recommendations");
        }
    };

    useEffect(() => {
        loadMusic();
    }, []);

    useEffect(() => {
        if (musics.length > 0) {
            getRecommendations();
        }
    }, [musics]); // Call recommendation service once musics are loaded

    return (
        <div>
            <h2>Recommended Songs</h2>
            <ul>
                {recommendedSongs.map((song, index) => (
                    <li key={index}>{song.title} - {song.artist}</li>
                ))}
            </ul>
        </div>
    );
}

export default SongRecommendationPage;