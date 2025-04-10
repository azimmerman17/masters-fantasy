import { useContext } from 'react'

import { FantasyTournamentConfig } from '../../../Contexts/FantasyTournamentConfig'
import LeaderboardScoreCard from './LeaderboardScorecard'

const FantasyLeaderboardAccordionContent = ({ lineup, player }) => {
  const {fantasyTournamentConfig, setFantasyTournamentConfig} = useContext(FantasyTournamentConfig)
  
  if (!fantasyTournamentConfig) return null
  if (!lineup || !player) return <p>pending...</p>
  else {
    const { player1, player2, player3, round } = lineup
    const { round1, round2, round3, round4, user_name } = player
    const { round1Lock, round2Lock, round3Lock, round4Lock, } = fantasyTournamentConfig
    console.log(round1Lock)
    let roundlocked
    let score
    switch (round) {
      case 1:
        roundlocked = round1Lock
        score = round1
        break
      case 2:
        roundlocked = round2Lock
        score = round2
        break
      case 3:
        roundlocked = round3Lock
        score = round3
        break
      case 4:
        roundlocked = round4Lock
        score = round4
        break
      default:
        roundlocked = new Date()
    }

    if (new Date(roundlocked * 1000) > new Date() ) return <h6 className='m-1 text-center'>No Scores to Display</h6>
    return  <LeaderboardScoreCard player1={player1} player2={player2} player3={player3} user_name={user_name} round={round} />
  }
}

export default FantasyLeaderboardAccordionContent