import { Link } from 'react-router-dom';
import { useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';

function CreateExercisePage() {
    const [name, setName] = useState('');
    const [reps, setReps] = useState('');
    const [weight, setWeight] = useState('');
    const [unit, setUnit] = useState('lbs');
    const [date, setDate] = useState('');

    const navigate = useNavigate();

    const CreateExercise = async () => {
        const newExercise = {name, reps, weight, unit, date}
        const response = await fetch(
            '/exercises', {
                method: 'POST',
                headers: {'Content-type': 'application/json'},
                body: JSON.stringify(newExercise)
                }
        );
        if(response.status === 201){
            alert("Succesfully added the movie");
        } else{
            alert("Failed to add movie, status code = " + response.status);
        }
        navigate('/')
    };

    return (
        <div>
            <h1>Create Exercise</h1>
            <input
                type="text"
                placeholder="Enter Name here"
                value={name}
                onChange={e => setName(e.target.value)} />
            <input
                type="number"
                placeholder="Enter Reps here"
                value={reps}
                onChange={e => setReps(e.target.valueAsNumber)} />
            <input
                type="number"
                placeholder="Enter Weight here"
                value={weight}
                onChange={e => setWeight(e.target.valueAsNumber)} />
            <select
                value={unit}
                onChange={e => setUnit(e.target.value)} >
                <option value="lbs">lbs</option>
                <option value="kgs">kgs</option>
            </select>
            <input
                type="text"
                placeholder="Enter Date here"
                value={date}
                onChange={e => setDate(e.target.value)} />
            <button
                onClick={CreateExercise}
            >Update</button>
        </div>
    );
}

export default CreateExercisePage;