import { Link } from 'react-router-dom';
import { useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';

function CreateMusicPage() {
    const [title, setTitle] = useState('');
    const [artist, setArtist] = useState('');
    const [album, setAlbum] = useState('');
    const [genre, setGenre] = useState('');

    const navigate = useNavigate();

    const CreateMusic = async () => {
        const newMusic = {title, artist, album, genre}
        const response = await fetch(
            '/musics', {
                method: 'POST',
                headers: {'Content-type': 'application/json'},
                body: JSON.stringify(newMusic)
                }
        );
        if(response.status === 201){
            alert("Succesfully added the track");
        } else{
            alert("Failed to add track, status code = " + response.status);
        }
        navigate('/music-library')
    };

    return (
        <div>
            <h1>Add Track</h1>
            <input
                type="text"
                placeholder="Enter Title here"
                value={title}
                onChange={e => setTitle(e.target.value)} />
            <input
                type="text"
                placeholder="Enter Artist here"
                value={artist}
                onChange={e => setArtist(e.target.value)} />
            <input
                type="text"
                placeholder="Enter Album here"
                value={album}
                onChange={e => setAlbum(e.target.value)} />
            <input
                type="text"
                placeholder="Enter Genre here"
                value={genre}
                onChange={e => setGenre(e.target.value)} />

            <button
                onClick={CreateMusic}
            >Add Track</button>
        </div>
    );
}

export default CreateMusicPage;