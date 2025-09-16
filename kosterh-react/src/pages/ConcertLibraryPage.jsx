import { Link } from 'react-router-dom';
import { useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import ConcertCollection from '../components/ConcertCollection'

function ConcertLibraryPage({setConcertToEdit}) {
    const [concerts, setConcerts] = useState([]);
    const navigate = useNavigate();

    const loadConcert = async () => {
        const response = await fetch('/concerts');
        const data = await response.json();
        console.log("Fetched musics:", data);
        setConcerts(data);
    }

    useEffect( () => {
        loadConcert();
    }, []);

    const onDelete = async (_id) =>{
        const response = await fetch(`/concerts/${_id}`, {
            method: 'DELETE',
        });
        if(response.status === 204){
            setConcerts(concerts.filter((concerts) => concerts._id !== _id))
            alert(`Successfully deleted the concert with _id = ${_id}`)
        } else{
            alert(`Failed to delete the concert with _id = ${_id}, status code = ${response.status}`)
        }
    }
    
    const onEdit = (concert) =>{
        setConcertToEdit(concert)
        navigate('/edit-concert')
    }

    return (
        <>
            <ConcertCollection concerts={concerts} onDelete={onDelete} onEdit={onEdit}></ConcertCollection>
            <Link to="/create-concert">Add a Concert</Link>
        </>
    );
}

export default ConcertLibraryPage;