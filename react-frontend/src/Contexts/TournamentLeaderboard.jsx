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
      if (data) {
        let path = BASE_URL + 'scoring/sendscores'
        let payload = {
          data: data
        }

        try {
          await HandleDBTransaction(path, 'POST', payload)
        } catch (error) {
          console.error(error)
        }
      }
    }

    const fetchData = async (path, pairings) => {
      // Get the Leaderboard Data
      try {
        const leaderboardRes = await fetch('https://www.masters.com' + path)
        const leaderboardData = await leaderboardRes.json()

        // Get the Pairings Data
        const pairingsRes = await fetch('https://www.masters.com' + pairings)
        const pairingsData = await pairingsRes.json()

        const { data } = leaderboardData
        if (data) {
          sendScores(data) 
     
          setTournamentLeaderboardContext({
            leaderboard: data,
            pairings: pairingsData
          })
        } else {
          setTournamentLeaderboardContext({
            leaderboard: null,
            pairings: null
          })
        }
      } catch (error) {
        console.log('No pairings or leaderboard data')
        setTournamentLeaderboardContext({
          leaderboard: null,
          pairings: null
        })      
      }
    }

    if (eventConfig && !tournamentLeaderboardContext) {
      const { scoringData } = eventConfig
      const { liveScore, pairings } = scoringData
      const { path } = liveScore
      if (!path || !pairings) {
        setTournamentLeaderboardContext({
          leaderboard: null,
          pairings: null
        })
      }
      else fetchData(path, pairings)
    }

    let refresh = 60
    let interval = setInterval(() => {
      const { scoringData } = eventConfig
      const { liveScore, pairings } = scoringData
      const { path } = liveScore
      if (!path || !pairings) {
        setTournamentLeaderboardContext({
          leaderboard: null,
          pairings: null
        })
      }
      else fetchData(path, pairings)
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