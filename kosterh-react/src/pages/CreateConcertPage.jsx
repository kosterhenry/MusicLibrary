import { Link } from 'react-router-dom';
import { useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';

function CreateConcertPage() {
    const [artist, setArtist] = useState('');
    const [concert, setConcert] = useState('');
    const [date, setDate] = useState('');

    const navigate = useNavigate();

    const CreateConcert = async () => {
        const newConcert = {artist, concert, date}
        const response = await fetch(
            '/concerts', {
                method: 'POST',
                headers: {'Content-type': 'application/json'},
                body: JSON.stringify(newConcert)
                }
        );
        if(response.status === 201){
            alert("Succesfully added the concert");
        } else{
            alert("Failed to add concert, status code = " + response.status);
        }
        navigate('/concert-library')
    };

    return (
        <div>
            <h1>Add Concert</h1>
            <h3>Follow these steps to add a concert</h3>
            <h4>1. Enter the Artist, Concert, and Date in the specified fields</h4>
            <h5>All Fields are required to be entered.</h5>
            <h4>2. Click Create Concert to Enter Concert into Concert Library.</h4>
            <input
                type="text"
                placeholder="Enter Artist here"
                value={artist}
                onChange={e => setArtist(e.target.value)} />
            <input
                type="text"
                placeholder="Enter Concert here"
                value={concert}
                onChange={e => setConcert(e.target.value)} />
            <input
                type="text"
                placeholder="Enter Date here"
                value={date}
                onChange={e => setDate(e.target.value)} />

            <button
                onClick={CreateConcert}
            >Create Concert</button>
        </div>
    );
}

export default CreateConcertPage;