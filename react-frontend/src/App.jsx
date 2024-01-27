import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useState, useEffect } from 'react'
import './App.css'

import EventConfigProvider from './Contexts/EventConfig'
import TournamentLeaderboardProvider from './Contexts/TournamentLeaderboard'

function App() {
  const [title, setTitle] = useState('APP')

  useEffect(() => {
    document.title = 'Master\'s Fantasy Golf'
  }, [title])

  return (
    <div>
      <Router>
        <EventConfigProvider>
          <TournamentLeaderboardProvider>
            Masters Fantasty Golf 
          </TournamentLeaderboardProvider>
        </EventConfigProvider>
      </Router>
    </div>
  )

}

export default App
