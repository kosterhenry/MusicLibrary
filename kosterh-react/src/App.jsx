import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation'
import HomePage from './pages/HomePage';
import MusicLibraryPage from './pages/MusicLibraryPage'
import EditMusicPage from './pages/EditMusicPage';
import CreateMusicPage from './pages/CreateMusicPage';
import ConcertLibraryPage from './pages/ConcertLibraryPage';
import EditConcertPage from './pages/EditConcertPage';
import CreateConcertPage from './pages/CreateConcertPage';
import SongRecommendationPage from './pages/SongRecommendationPage';

function App() {

  const [musicToEdit, setMusicToEdit] = useState();
  const [concertToEdit, setConcertToEdit] = useState();

  return (

    <div className="app">
        <Router>
        <Navigation/>
          <Routes>
            <Route path="/" element={<HomePage />}></Route>
            <Route path="/music-library" element={<MusicLibraryPage setMusicToEdit={setMusicToEdit} />}></Route>
            <Route path="/edit-music" element={ <EditMusicPage musicToEdit={musicToEdit} />}></Route>
            <Route path="/create-music" element={ <CreateMusicPage />}></Route>
            <Route path="/concert-library" element={<ConcertLibraryPage setConcertToEdit={setConcertToEdit} />}></Route>
            <Route path="/edit-concert" element={ <EditConcertPage concertToEdit={concertToEdit} />}></Route>
            <Route path="/create-concert" element={ <CreateConcertPage />}></Route>
            <Route path="/song-recommendation" element={ <SongRecommendationPage />}></Route>
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