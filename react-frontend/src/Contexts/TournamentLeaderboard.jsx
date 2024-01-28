// context for the Tournament Leaderboard
import { useEffect, createContext, useContext, useState } from "react";

import { EventConfig } from './EventConfig'

export const TournamentLeaderboardContext = createContext()

const TournamentLeaderboardContextProvider = ({ children }) => {
  const { eventConfig, setEventConfig } = useContext(EventConfig)

  const [tournamentLeaderboardContext, setTournamentLeaderboardContext] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      const { scoringData } = eventConfig
      const { liveScore } = scoringData
      const { path } = liveScore
      const response = await fetch('https://www.masters.com' + path)
      const data = await response.json()
      setTournamentLeaderboardContext(data.data)
    }
    
    if (eventConfig && tournamentLeaderboardContext === null) fetchData()

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

  }, [tournamentLeaderboardContext, eventConfig])

  return (
    <TournamentLeaderboardContext.Provider value={{ tournamentLeaderboardContext, setTournamentLeaderboardContext }}>
      {children}
    </TournamentLeaderboardContext.Provider>
  )
}

export default TournamentLeaderboardContextProvider