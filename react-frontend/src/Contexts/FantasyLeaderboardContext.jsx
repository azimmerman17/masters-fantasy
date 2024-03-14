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
        const response = await fetch(BASE_URL + 'scoring')
        const data = await response.json()
        const { rows, rowCount } = data
        if (rowCount < 1) setFantasyLeaderboard(null)
        else setFantasyLeaderboard(rows)
      } catch (error) {
        console.log('Error fetching leaderboard')
      }
      console.log('init')
      // fetch the data

      // clean the data

      // set the context
    }


    if (!currentUser) setFantasyLeaderboard(null)
    else if (currentUser && !fantasyLeaderboard ) fetchData()

    //set on refresh interval - 5 or 10 minutes

  }, [currentUser, fantasyLeaderboard])

  console.log(currentUser)
  console.log(fantasyLeaderboard)
  return (
    <FantasyLeaderboard.Provider value={{fantasyLeaderboard, setFantasyLeaderboard}}>
      {children}
    </FantasyLeaderboard.Provider>
  )
}

export default FantasyLeaderboardProvider