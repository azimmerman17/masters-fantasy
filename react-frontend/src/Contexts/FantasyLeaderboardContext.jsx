// context for configuation for the Fantasy Tournament
import { useEffect, createContext, useState, useContext } from "react";

import { CurrentUser } from './CurrentUserContext'
import BASE_URL from "../assets/Files/BASE_URL";


export const FantasyLeaderboard = createContext()

const FantasyLeaderboardProvider = ({ children }) => {
  const [fantasyLeaderboard, setFantasyLeaderboard] = useState(null)
  const { currentUser, setCurrentUser } = useContext(CurrentUser)

  useEffect(() => {
    const fetchData = async () => {
      try {
        // fetch the data
        const response = await fetch(BASE_URL + 'scoring')
        const data = await response.json()
        // clean the data
        const { rows, rowCount } = data
        // set the context
        if (rowCount < 1) setFantasyLeaderboard(null)
        else setFantasyLeaderboard(rows)
      } catch (error) {
        console.log('Error fetching leaderboard')

      }
    }

    if (!currentUser && !fantasyLeaderboard)  setFantasyLeaderboard('Pending')
    if (!currentUser) setFantasyLeaderboard('Login Required')
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