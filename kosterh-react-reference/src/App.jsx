import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation'
import HomePage from './pages/HomePage';
import EditExercisePage from './pages/EditExercisePage';
import CreateExercisePage from './pages/CreateExercisePage';

function App() {

  const [exerciseToEdit, setExerciseToEdit] = useState();

  return (

    <div className="app">
      <header>
        <h1>Exercise Tracker</h1>
        <p>Full Stack MERN App Demonstration</p>
      </header>
        <Router>
        <Navigation/>
          <Routes>
            <Route path="/" element={<HomePage setExerciseToEdit={setExerciseToEdit} />}></Route>
            <Route path="/edit-exercise" element={ <EditExercisePage exerciseToEdit={exerciseToEdit} />}></Route>
            <Route path="/create-exercise" element={ <CreateExercisePage />}></Route>
          </Routes>
        </Router>
      <footer>
        <p>
          ©2024 Henry Koster
        </p>
      </footer>
    </div>
  )
}

export default App
