// context for the Tournament Leaderboard
import { useEffect, createContext, useContext, useState } from "react";

import { EventConfig } from './EventConfig'

export const TournamentLeaderboard = createContext()

const TournamentLeaderboardProvider = ({ children }) => {
  const { eventConfig, setEventConfig } = useContext(EventConfig)

  const [tournamentLeaderboard, setTournamentLeaderboard] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      const { scoringData } = eventConfig
      const { liveScore } = scoringData
      const { path } = liveScore
      const response = await fetch('https://www.masters.com' + path)
      const data = await response.json()
      setTournamentLeaderboard(data.data)
    }
    
    if (eventConfig && tournamentLeaderboard === null) fetchData()

    let refresh = 60
    let interval = setInterval(() => {
      fetchData() 
      if (eventConfig) {
        const { scoringData } = eventConfig
        const { liveScore } = scoringData
        const { rateSec } = liveScore
        refresh = rateSec
      }
    }, refresh * 1000)  //refresh every 60 seconds or masters set refresh rate

    return () => clearInterval(interval)

  }, [tournamentLeaderboard, eventConfig])

  return (
    <TournamentLeaderboard.Provider value={{ tournamentLeaderboard, setTournamentLeaderboard }}>
      {children}
    </TournamentLeaderboard.Provider>
  )
}

export default TournamentLeaderboardProvider