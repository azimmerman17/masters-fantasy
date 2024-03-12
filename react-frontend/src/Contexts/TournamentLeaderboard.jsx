// context for the Tournament Leaderboard
import { useEffect, createContext, useContext, useState } from "react";

import { EventConfig } from './EventConfig'
import BASE_URL from "../assets/Files/BASE_URL";
import HandleDBTransaction from '../Functions/HandleDBTransaction'

export const TournamentLeaderboardContext = createContext()

const TournamentLeaderboardContextProvider = ({ children }) => {
  const { eventConfig, setEventConfig } = useContext(EventConfig)

  const [tournamentLeaderboardContext, setTournamentLeaderboardContext] = useState(null)

  useEffect(() => {
    const sendScores = async (data) => {
      let path = BASE_URL + 'scoring/sendscores'
      let payload = {
        data: data
      }

      try {
        await HandleDBTransaction(path, 'POST', payload)
      } catch (error) {
        console.error(error)
      }
      // console.log(data)
    }

    const fetchData = async () => {
      const { scoringData } = eventConfig
      const { liveScore, pairings } = scoringData
      const { path } = liveScore
      // Get the Leaderboard Data
      const leaderboardRes = await fetch('https://www.masters.com' + path)
      const leaderboardData = await leaderboardRes.json()
      // Get the Pairings Data
      const pairingsRes = await fetch('https://www.masters.com' + pairings)
      const pairingsData = await pairingsRes.json()

      sendScores(leaderboardData.data)

      setTournamentLeaderboardContext({pairings: pairingsData , leaderboard:leaderboardData.data})
    }
    
    if (eventConfig && tournamentLeaderboardContext === null) {
      fetchData()
    }

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