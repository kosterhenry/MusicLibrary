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
            <h3>Here you can add any tracks you wish to your Music Library.</h3>
            <h3>This allows users to keep track of all their favorite songs in an organized fashion.</h3>
            <h3>Follow these steps to add a track</h3>
            <h4>1. Enter the Title, Artist, Album, and Genre in the specified fields</h4>
            <h5>All Fields are required to be entered.</h5>
            <h4>2. Click Add Track to Enter Track into Music Library.</h4>
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