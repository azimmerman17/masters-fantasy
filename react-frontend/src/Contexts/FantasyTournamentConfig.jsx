// context for configuation for the Fantasy Tournament
import { useEffect, createContext, useState, useContext } from 'react';

import { EventConfig } from './EventConfig'
// import { TournamentLeaderboardContext } from './TournamentLeaderboard';

// import CheckTeeTimeLock from '../Functions/CheckTeeTimeLock';

export const FantasyTournamentConfig = createContext()

const FantasyTournamentConfigProvider = ({ children }) => {
  const BASE_URL = import.meta.env.VITE_BASE_URL
  const { eventConfig, setEventConfig } = useContext(EventConfig)
  // const {tournamentLeaderboardContext, setTournamentLeaderboardContext} = useContext(TournamentLeaderboardContext)
  const [fantasyTournamentConfig, setFantasyTournamentConfig] = useState({
    tourny_active: null,
    round_active: null,
    round1Lock: null,
    round2Lock: null,
    round3Lock: null,
    round4Lock: null,  
    currentRound: null,    
  })

  useEffect (() => {
    // get Fantasy Config info
    const fetchData = async () => {
    const response = await fetch(BASE_URL + 'admin/current')
    const data = await response.json()

    // set config info
    if (data === 'error') setFantasyTournamentConfig({
      tourny_active: 'P',
      round_active: 'P',
      round1Lock: false,
      round2Lock: false,
      round3Lock: false,
      round4Lock: false,  
      currentRound: 0,   
    })
    else {
      const {rnd, rnd1_lck, rnd2_lck, rnd3_lck, rnd4_lck, tourny_actve, rnd_actve} = data[0]
        setFantasyTournamentConfig({
          tourny_active: tourny_actve,
          round_active: rnd_actve,
          round1Lock: rnd1_lck,
          round2Lock: rnd2_lck,
          round3Lock: rnd3_lck,
          round4Lock: rnd4_lck,
          currentRound: rnd
        })
      }
    }

    if (!fantasyTournamentConfig.round_active) fetchData()

    //set on refresh interval
    let refresh = 30 // minutes for refresh
    let interval = setInterval(() => {
      if (eventConfig) {
        fetchData()
      }
    }, refresh * 60 * 1000)

    return () => clearInterval(interval)
  }, [eventConfig, fantasyTournamentConfig])

  // Used Prior to Config table
  // useEffect (() => {
  //   if (eventConfig && tournamentLeaderboardContext) {
  //     // console.log(eventConfig, tournamentLeaderboardContext)
  //     if (!tournamentLeaderboardContext.pairings|| !tournamentLeaderboardContext.leaderboard) {
  //       setFantasyTournamentConfig({
  //         tourny_active: 'P',
  //         round_active: 'P',
  //         round1Lock: ,
  //         round2Lock: false,
  //         round3Lock: false,
  //         round4Lock: false,  
  //         currentRound: 0, 

  //         rosterLock: false,
  //         round1Lock: false,
  //         round2Lock: false,
  //         round3Lock: false,
  //         round4Lock: false,    
  //         currentRound: 1
  //       })

  //     } else {
  //       const { pairings, leaderboard } = tournamentLeaderboardContext
  //       const { currentRound, round1, round2, round3, round4 } = pairings
  //       const { statusRound } = leaderboard

  //       const getRoundLock = (currentRound, pairing) => {
  //         const { day, group } = pairing

  //         if (currentRound > day) return true   // past round LOCKED
  //         else if (currentRound === day) {      // current round
  //           let roundIndex = Number(currentRound) - 1

  //           if (statusRound[roundIndex] === 'F' || statusRound[roundIndex] === 'P') return true  // if current round in status Final LOCKED
  //           else if (statusRound[roundIndex] === 'N') return false  // if current round is not started UNLOCKED
  //           else {
  //             // if status is not in Final - check for last tee time off 1  is after that time LOCKED
  //             const firstTeeTime = group[0]['time']
              
  //             return CheckTeeTimeLock(firstTeeTime, -5)
  //           }
  //         } else return false     // Future Round UNLOCKED
  //       }

  //       const checkRosterLock = (curRnd, rndstatus, pairings) => {
  //         // locked if round is > 1, or round 1 status is live or final -- unsure of status codes just a guess
  //         if (curRnd > '1' || rndstatus[0] === 'F' || rndstatus[0] === 'P') return true  
  //         if (curRnd >= '1' && rndstatus[0] !== 'N') {
  //           // lock roster after first tee time of round 1
  //           const { group } = pairings
  //           const openingTeeTime = group[0]['time']
  //           return CheckTeeTimeLock(openingTeeTime, -5)
  //         }
          
  //         return false
  //       }

  //       const getCurrentRound = (roundStatus) => {
  //         let currentRound = 0

  //         for (let i = 0; i < 4; i++) {
  //           if (roundStatus[i] !== 'N') currentRound += 1
  //         }

  //         return currentRound
  //       }

  //       setFantasyTournamentConfig({
  //         rosterLock: checkRosterLock(currentRound, statusRound, round1),
  //         round1Lock: getRoundLock(currentRound, round1),
  //         round2Lock: getRoundLock(currentRound, round2),
  //         round3Lock: getRoundLock(currentRound, round3),
  //         round4Lock: getRoundLock(currentRound, round4),    
  //         currentRound: getCurrentRound(statusRound)
  //       })
  //     }
  //   }
  // }, [eventConfig, tournamentLeaderboardContext])

  return (
    <FantasyTournamentConfig.Provider value={{ fantasyTournamentConfig, setFantasyTournamentConfig }}>
      {children}
    </FantasyTournamentConfig.Provider>
  )
}

export default FantasyTournamentConfigProvider