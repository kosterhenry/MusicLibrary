import { Link } from 'react-router-dom';
import { useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import MusicCollection from '../components/MusicCollection'

function MusicLibraryPage({setMusicToEdit}) {
    const [musics, setMusics] = useState([]);
    const navigate = useNavigate();

    const loadMusic = async () => {
        const response = await fetch('/musics');
        const data = await response.json();
        console.log("Fetched musics:", data);
        setMusics(data);
    }

    useEffect( () => {
        loadMusic();
    }, []);

    const onDelete = async (_id) =>{
        const response = await fetch(`/musics/${_id}`, {
            method: 'DELETE',
        });
        if(response.status === 204){
            setMusics(musics.filter((musics) => musics._id !== _id))
            alert(`Successfully deleted the track with _id = ${_id}`)
        } else{
            alert(`Failed to delete the track with _id = ${_id}, status code = ${response.status}`)
        }
    }
    
    const onEdit = (music) =>{
        setMusicToEdit(music)
        navigate('/edit-music')
    }

    return (
        <>
            <MusicCollection musics={musics} onDelete={onDelete} onEdit={onEdit}></MusicCollection>
            <Link to="/create-music">Create a Track</Link>
        </>
    );
}

export default MusicLibraryPage;