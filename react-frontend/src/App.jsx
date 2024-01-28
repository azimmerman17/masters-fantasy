import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useState, useEffect } from 'react'
import './App.css'

import EventConfigProvider from './Contexts/EventConfig'
import TournamentLeaderboardContextProvider from './Contexts/TournamentLeaderboard'
import TournamentLeaderboard from './Components/Leaderboard/TournamentLeaderboard/TournamentLeaderboard'
import NavBar from './Components/NavBar'

function App() {
  const [title, setTitle] = useState('APP')

  useEffect(() => {
    document.title = 'Master\'s Fantasy Golf'
  }, [title])

  return (
    <div>
      <Router>
        <EventConfigProvider>
          <TournamentLeaderboardContextProvider>
            <header>
              <NavBar />
            </header>
            <main  style={{marginTop: '75px'}}>
              <Routes>
                <Route path='/tournament/leaderboard' element={<TournamentLeaderboard />} />
              </Routes>
              Masters Fantasty Golf 
            </main>
          </TournamentLeaderboardContextProvider>
        </EventConfigProvider>
      </Router>
    </div>
  )

}

export default App
