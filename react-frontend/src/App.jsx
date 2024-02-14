import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useState, useEffect } from 'react'
import './App.css'

import CurrentUserProvider from './Contexts/CurrentUserContext'
import EventConfigProvider from './Contexts/EventConfig'
import TournamentLeaderboardContextProvider from './Contexts/TournamentLeaderboard'
import PlayersContextProvider from './Contexts/PlayersContext'
import NavBar from './Components/NavBar'
import TournamentLeaderboard from './Components/Leaderboard/TournamentLeaderboard/TournamentLeaderboard'
import TournamentPlayers from './Components/Players/TournamentPlayers'
import PlayerPage from './Components/Players/PlayerPage/PlayerPage'
import SignUp from './Components/SignUp'
import HomePage from './Components/HomePage'

function App() {
  const [title, setTitle] = useState('APP')

  useEffect(() => {
    document.title = 'Master\'s Fantasy Golf'
  }, [title])

  return (
    <div>
      <Router>
        <CurrentUserProvider>
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
                    <Route exact path='/' element={<HomePage />} />
                    <Route path='/tournament/leaderboard' element={<TournamentLeaderboard />} />
                    <Route path='/tournament/players' element={<TournamentPlayers />} />
                    <Route path='/tournament/players/:playerId' element={<PlayerPage />} />  
                    <Route path='/newUser' element={<SignUp />} />                
                  </Routes>
                </main>
                <footer>
                  Masters Fantasty Golf 
                </footer>
              </PlayersContextProvider>
            </TournamentLeaderboardContextProvider>
          </EventConfigProvider>
        </CurrentUserProvider>
      </Router>
    </div>
  )

}

export default App
