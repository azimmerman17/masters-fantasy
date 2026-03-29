// context for the Tournament Leaderboard
import { useEffect, createContext, useContext, useState } from 'react';

import { EventConfig } from './EventConfig'
import HandleDBTransaction from '../Functions/HandleDBTransaction'
import MASTERS_URL from '../assets/Files/MASTERS_URL';

export const TournamentLeaderboardContext = createContext()

const TournamentLeaderboardContextProvider = ({ children }) => {
  const BASE_URL = import.meta.env.VITE_BASE_URL
  const { eventConfig, setEventConfig } = useContext(EventConfig)
  const [tournamentLeaderboardContext, setTournamentLeaderboardContext] = useState(null)

  useEffect(() => {
    const sendScores = async (data) => {
      if (data) {
        let path = BASE_URL + 'scoring/sendscores'
        let payload = {
          data: data
        }
        console.log('DATA', data)

        try {
          await HandleDBTransaction(path, 'POST', payload)
        } catch (error) {
          console.error(error)
        }
      }
    }

    const fetchData = async (path, pairings, year) => {
      // Get the Leaderboard Data
      try {
        const leaderboardRes = await fetch(MASTERS_URL + path)
        const leaderboardData = await leaderboardRes.json()

        // Get the Pairings Data
        const pairingsRes = await fetch(MASTERS_URL + pairings)
        let pairingsData = await pairingsRes.json()

        // Verify current year
        let { data, epoch } = leaderboardData
        const { fileEpoch } = pairingsData
        if (new Date(epoch * 1000).getFullYear() < year) data = null                        // Leaderboard Response
        if (new Date(fileEpoch * 1000).getFullYear() < year) data = pairingsData = null     // Pairings Response

        if (data || pairingsData) {
          sendScores({leaderboard: data, pairings: pairingsData, timestamps: {lb: epoch, p: fileEpoch}}) 
          
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
      const { scoringData, dataSettings } = eventConfig
      const { liveScore, pairings } = scoringData
      const { tournamentYear } = dataSettings
      const { path } = liveScore
      if (!path || !pairings) {
        setTournamentLeaderboardContext({
          leaderboard: null,
          pairings: null,
        })
      }
      else fetchData(path, pairings, tournamentYear)
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