import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useState, useEffect } from 'react'
import './App.css'

import CurrentUserProvider from './Contexts/CurrentUserContext'
import EventConfigProvider from './Contexts/EventConfig'
import TournamentLeaderboardContextProvider from './Contexts/TournamentLeaderboard'
import PlayersContextProvider from './Contexts/PlayersContext'
import FantasyTournamentConfigProvider from './Contexts/FantasyTournamentConfig'
import FantasyLeaderboardProvider from './Contexts/FantasyLeaderboardContext'

import NavBar from './Components/NavBar'
import TournamentLeaderboard from './Components/Leaderboard/TournamentLeaderboard/TournamentLeaderboard'
import TournamentPlayers from './Components/Players/TournamentPlayers'
import PlayerPage from './Components/Players/PlayerPage/PlayerPage'
import FantasyLeaderboardView from './Components/Leaderboard/FantasyLeaderboard/FantasyLeaderboardView'
import SignUp from './Components/SignUp'
import HomePage from './Components/HomePage'
import UserProfile from './Components/User/UserProfile'
import UserRoster from './Components/UserRoster/UserRoster'
import Footer from './Components/Footer'

function App() {
  const [title, setTitle] = useState('APP')

  useEffect(() => {
    document.title = 'Master\'s Fantasy Golf'
  }, [title])

  return (
    <>
      <Router>
        <CurrentUserProvider>
          <EventConfigProvider>
              <TournamentLeaderboardContextProvider>
                <PlayersContextProvider>
                  <FantasyTournamentConfigProvider>
                    <FantasyLeaderboardProvider>
                      <header>
                        <NavBar />
                      </header>
                      <main  style={{marginTop: '50px', marginBottom: '100px'}} className='mx-0 p-0'>
                        <Routes>
                          {/* Home Page  if logged in user_profile else log out*/}
                          {/* Login PAge */}
                          <Route exact path='/' element={<HomePage />} />
                          <Route path='/tournament/leaderboard' element={<TournamentLeaderboard />} />
                          <Route path='/tournament/players' element={<TournamentPlayers />} />
                          <Route path='/tournament/players/:playerId' element={<PlayerPage />} />  
                          <Route path='/newuser' element={<SignUp />} />       
                          <Route path='/profile' element={<UserProfile />} />
                          <Route path='/profile/:username' element={<UserProfile />} />
                          <Route path='/roster' element={<UserRoster />} />
                          <Route path='/roster/:username' element={<UserRoster />} />
                          <Route path='/leaderboard' element={<FantasyLeaderboardView />} />
                        </Routes>
                      </main>
                      <footer style={{marginTop: '75px'}}>
                        {/* <Footer /> */}
                      </footer>
                    </FantasyLeaderboardProvider>
                  </FantasyTournamentConfigProvider>
                </PlayersContextProvider>
              </TournamentLeaderboardContextProvider>
          </EventConfigProvider>
        </CurrentUserProvider>
      </Router>
    </>
  )

}

export default App
