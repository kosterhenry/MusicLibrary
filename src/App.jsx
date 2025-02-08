import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation'
import HomePage from './pages/HomePage';
import MusicLibraryPage from './pages/MusicLibraryPage'
import EditMusicPage from './pages/EditMusicPage';
import CreateMusicPage from './pages/CreateMusicPage';

function App() {

  const [musicToEdit, setMusicToEdit] = useState();

  return (

    <div className="app">
        <Router>
        <Navigation/>
          <Routes>
            <Route path="/" element={<HomePage />}></Route>
            <Route path="/music-library" element={<MusicLibraryPage setMusicToEdit={setMusicToEdit} />}></Route>
            <Route path="/edit-music" element={ <EditMusicPage musicToEdit={musicToEdit} />}></Route>
            <Route path="/create-music" element={ <CreateMusicPage />}></Route>
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