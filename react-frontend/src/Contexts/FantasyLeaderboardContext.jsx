// context for configuation for the Fantasy Tournament
import { useEffect, createContext, useState, useContext } from 'react';

import { CurrentUser } from './CurrentUserContext'

export const FantasyLeaderboard = createContext()

const FantasyLeaderboardProvider = ({ children }) => {
  const BASE_URL = import.meta.env.VITE_BASE_URL
  const [fantasyLeaderboard, setFantasyLeaderboard] = useState(null)
  const { currentUser, setCurrentUser } = useContext(CurrentUser)

  useEffect(() => {
    const fetchData = async () => {
      try {
        // fetch the data
        const response = await fetch(BASE_URL + 'scoring')
        const data = await response.json()

        if (data === 'error') setFantasyLeaderboard(null)
        else setFantasyLeaderboard(data)
        
      } catch (error) {
        console.error(error)
        console.log('Error fetching leaderboard')
      }
    }

    if (!currentUser && !fantasyLeaderboard)  setFantasyLeaderboard('Pending')
    if (!currentUser) setFantasyLeaderboard('Pending')
    else if (currentUser && (!fantasyLeaderboard  || fantasyLeaderboard === 'Login Required' || fantasyLeaderboard === 'Pending')) fetchData()

    //set on refresh interval - 5 or 10 minutes
    let refresh = 5 // minutes for refresh
    let interval = setInterval(() => {
      if (currentUser) {
        fetchData()
      }
    }, refresh * 60 * 1000)

    return () => clearInterval(interval)
  }, [currentUser, fantasyLeaderboard])

  return (
    <FantasyLeaderboard.Provider value={{fantasyLeaderboard, setFantasyLeaderboard}}>
      {children}
    </FantasyLeaderboard.Provider>
  )
}

export default FantasyLeaderboardProvider