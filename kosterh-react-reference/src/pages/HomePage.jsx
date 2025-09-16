import { Link } from 'react-router-dom';
import { useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import ExerciseCollection from '../components/ExerciseCollection'

function HomePage({setExerciseToEdit}) {
    const [exercises, setExercises] = useState([]);
    const navigate = useNavigate();

    const loadExercise = async () => {
        const response = await fetch('/exercises');
        const data = await response.json();
        console.log("Fetched exercises:", data);
        setExercises(data);
    }

    useEffect( () => {
        loadExercise();
    }, []);

    const onDelete = async (_id) =>{
        const response = await fetch(`/exercises/${_id}`, {
            method: 'DELETE',
        });
        if(response.status === 204){
            setExercises(exercises.filter((exercises) => exercises._id !== _id))
            alert(`Successfully deleted the exercise with _id = ${_id}`)
        } else{
            alert(`Failed to delete the exercise with _id = ${_id}, status code = ${response.status}`)
        }
    }
    
    const onEdit = (exercise) =>{
        setExerciseToEdit(exercise)
        navigate('/edit-exercise')
    }

    return (
        <>
            <ExerciseCollection exercises={exercises} onDelete={onDelete} onEdit={onEdit}></ExerciseCollection>
            <Link to="/create-exercise">Create an exercise</Link>
        </>
    );
}

export default HomePage;