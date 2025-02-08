import { Link } from 'react-router-dom';
import { useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';

function EditMusicPage({musicToEdit}) {
    const [title, setTitle] = useState(musicToEdit.title);
    const [artist, setArtist] = useState(musicToEdit.artist);
    const [album, setAlbum] = useState(musicToEdit.album);
    const [genre, setGenre] = useState(musicToEdit.genre);


    const navigate = useNavigate();

    const editMusic = async () => {
        const editedMusic = {title, artist, album, genre}
        const response = await fetch(
                `/musics/${musicToEdit._id}`, {
                method: 'PUT',
                headers: {'Content-type': 'application/json'},
                body: JSON.stringify(editedMusic)
                }
        );
        if(response.status === 200){
            alert("Succesfully edited the track");
        } else{
            alert("Failed to edit the track, status code = " + response.status);
        }
        navigate('/music-library')
    };

    return (
        <div>
            <h1>Edit Tracks</h1>
            <input
                type="text"
                value={title}
                onChange={e => setTitle(e.target.value)} />
            <input
                type="text"
                value={artist}
                onChange={e => setArtist(e.target.value)} />
            <input
                type="text"
                value={album}
                onChange={e => setAlbum(e.target.value)} />
            <input
                type="text"
                value={genre}
                onChange={e => setGenre(e.target.value)} />

            <button
                onClick={editMusic}
            >Update</button>
        </div>
    );
}

export default EditMusicPage;