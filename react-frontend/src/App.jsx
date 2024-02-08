import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useState, useEffect } from 'react'
import './App.css'

import EventConfigProvider from './Contexts/EventConfig'
import NavBar from './Components/NavBar'
import TournamentLeaderboardContextProvider from './Contexts/TournamentLeaderboard'
import TournamentLeaderboard from './Components/Leaderboard/TournamentLeaderboard/TournamentLeaderboard'
import TournamentPlayers from './Components/Players/TournamentPlayers'
import PlayersContextProvider from './Contexts/PlayersContext'
import PlayerPage from './Components/Players/PlayerPage/PlayerPage'

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
            <PlayersContextProvider>
              <header>
                <NavBar />
              </header>
              <main  style={{marginTop: '50px'}} className='mx-0 p-0'>
                <Routes>
                  {/* Home Page  if logged in user_profile else log out*/}
                  {/* Login PAge */}
                  <Route path='/tournament/leaderboard' element={<TournamentLeaderboard />} />
                  <Route path='/tournament/players' element={<TournamentPlayers />} />
                  <Route path='/tournament/players/:playerId' element={<PlayerPage />} />                  
                </Routes>
                Masters Fantasty Golf 
              </main>
            </PlayersContextProvider>
          </TournamentLeaderboardContextProvider>
        </EventConfigProvider>
      </Router>
    </div>
  )

}

export default App
