import { useContext } from 'react'

import { TournamentLeaderboardContext } from '../../../Contexts/TournamentLeaderboard'
import GetPlayerData from '../../../Functions/GetPlayerData'
import LeaderboardScorecardMobile from '../../scorecards/LeaderBoardScorecardMoblie'
import LeaderboardScorecardDesktop from '../../scorecards/LeaderboardScorecardDesktop'

const LeaderboardScoreCard = ({ player1, player2, player3, user_name, round }) => {
  const {tournamentLeaderboardContext, setTournamentLeaderboardContext} = useContext(TournamentLeaderboardContext)
  
  if(!tournamentLeaderboardContext) return null
  const { leaderboard } = tournamentLeaderboardContext
  const { player, pars } = leaderboard
  const roundKey = `round${round}`
 
  let player1Data = GetPlayerData(player1, player)
  let player2Data = GetPlayerData(player2, player)
  let player3Data = GetPlayerData(player3, player)

  return (
    <>
      {window.innerWidth < 776 ? (
        <LeaderboardScorecardMobile player1Data={player1Data} player2Data={player2Data} player3Data={player3Data} user_name={user_name} roundKey={roundKey} pars={pars[roundKey]} />
      ) :(
        <LeaderboardScorecardDesktop player1Data={player1Data} player2Data={player2Data} player3Data={player3Data} user_name={user_name} roundKey={roundKey} pars={pars[roundKey]} />
      )}
    </>

  )
}

export default LeaderboardScoreCard