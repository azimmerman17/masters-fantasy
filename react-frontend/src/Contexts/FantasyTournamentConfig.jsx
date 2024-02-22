// context for configuation for the Fantasy Tournament
import { useEffect, createContext, useState, useContext } from "react";

import { EventConfig } from './EventConfig'
import { TournamentLeaderboardContext } from "./TournamentLeaderboard";

import CheckTeeTimeLock from "../Functions/CheckTeeTimeLock";

export const FantasyTournamentConfig = createContext()

const FantasyTournamentConfigProvider = ({ children }) => {
  const { eventConfig, setEventConfig } = useContext(EventConfig)
  const {tournamentLeaderboardContext, setTournamentLeaderboardContext} = useContext(TournamentLeaderboardContext)
  const [fantasyTournamentConfig, setFantasyTournamentConfig] = useState({
    rosterLock: null,
    round1Lock: true,
    round2Lock: true,
    round3Lock: true,
    round4Lock: true,      
  })

  useEffect (() => {
    if (eventConfig && tournamentLeaderboardContext) {
      const { pairings, leaderboard } = tournamentLeaderboardContext
      const { currentRound, round1, round2, round3, round4 } = pairings
      const { statusRound } = leaderboard

      const getRoundLock = (currentRound, pairing) => {
        const { day, group } = pairing
        if (currentRound > day) return true   // past round LOCKED
        else if (currentRound === day) {      // current round
          let roundIndex = Number(currentRound) - 1
          if (statusRound[roundIndex] === 'F') return true  // if current round in status Final LOCKED
          else {
            // if status is not in Final - check for last tee time off 1  is after that time LOCKED
            const firstTeeStart = group.filter(i => i.tee === '1').length
            const finalTime = group[firstTeeStart - 1]['time']
            return CheckTeeTimeLock(finalTime, -5)
          }
        } else return false     // Future Round UNLOCKED
      }

      const checkRosterLock = (curRnd, rndstatus, pairings) => {
        console.log(eventConfig, tournamentLeaderboardContext)
        // locked if round is > 1, or round 1 status is live or final -- unsure of status codes just a guess
        if (curRnd > '1' || rndstatus[0] === 'F' || rndstatus[0] === 'L') return true  
        if (curRnd >= '1') {
          // lock roster after first tee time of round 1
          const { group } = pairings
          const openingTeeTime = group[0]['time']
          return CheckTeeTimeLock(openingTeeTime, -5)
        }
        
        return false
      }

      setFantasyTournamentConfig({
        rosterLock: checkRosterLock(currentRound, statusRound, round1),
        round1Lock: getRoundLock(currentRound, round1),
        round2Lock: getRoundLock(currentRound, round2),
        round3Lock: getRoundLock(currentRound, round3),
        round4Lock: getRoundLock(currentRound, round4),      
      })
    }
  }, [eventConfig, tournamentLeaderboardContext])

  return (
    <FantasyTournamentConfig.Provider value={{ fantasyTournamentConfig, setFantasyTournamentConfig }}>
      {children}
    </FantasyTournamentConfig.Provider>
  )
}

export default FantasyTournamentConfigProvider