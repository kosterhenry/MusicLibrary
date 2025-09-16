import { Link } from 'react-router-dom';
import { useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';

function EditConcertPage({concertToEdit}) {
    const [artist, setArtist] = useState(concertToEdit.artist);
    const [concert, setConcert] = useState(concertToEdit.concert);
    const [date, setDate] = useState(concertToEdit.date);


    const navigate = useNavigate();

    const editConcert = async () => {
        const editedConcert = {artist, concert, date}
        const response = await fetch(
                `/concerts/${concertToEdit._id}`, {
                method: 'PUT',
                headers: {'Content-type': 'application/json'},
                body: JSON.stringify(editedConcert)
                }
        );
        if(response.status === 200){
            alert("Succesfully edited the concert");
        } else{
            alert("Failed to edit the concert, status code = " + response.status);
        }
        navigate('/concert-library')
    };

    return (
        <div>
            <h1>Edit Concert</h1>
            <input
                type="text"
                value={artist}
                onChange={e => setArtist(e.target.value)} />
            <input
                type="text"
                value={concert}
                onChange={e => setConcert(e.target.value)} />
            <input
                type="text"
                value={date}
                onChange={e => setDate(e.target.value)} />

            <button
                onClick={editConcert}
            >Update</button>
        </div>
    );
}

export default EditConcertPage;