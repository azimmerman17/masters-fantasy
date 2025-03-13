import Table from 'react-bootstrap/Table'

import ScorecardDesktopHeaders from "../../assets/Files/ScorecardDesktopHeaders"
import PlayerScorecardHeaders from './PlayerScorecardHeaders'
import PlayerScorecardData from './PlayerScorecardData'
import GetUserScores from '../../Functions/GetUserScores'
import CreateLeaderboardScoreArr from '../../Functions/CreateLeaderboardScoreArr'

const LeaderboardScorecardDesktop = ({ player1Data, player2Data, player3Data, user_name, roundKey, pars }) => {
  // calculate user scores
  const userScores =  GetUserScores(player1Data[roundKey]['scores'], player2Data[roundKey]['scores'], player3Data[roundKey]['scores'])

  // Build Par Array
  let parArr = ['Par']
  let outPar = 0
  let inPar = 0

  for (let i = 0; i < pars.length; i++) {
    parArr.push(pars[i])
    if (i < 8) {
      outPar += pars[i]
    } else if (i === 8) {
      outPar += pars[i]
      parArr.push(outPar)
    } else {
      inPar += pars[i]
    }
  }
  parArr.push(inPar, inPar + outPar)

  // Arrays to handle the user's Score
  let userScoresArr= CreateLeaderboardScoreArr(user_name, userScores, 'full')

  //Arrays for player's Scors
  let player1Scores = CreateLeaderboardScoreArr(player1Data['display_name'], player1Data[roundKey]['scores'], 'full')

  let player2Scores = CreateLeaderboardScoreArr(player2Data['display_name'], player2Data[roundKey]['scores'], 'full')

  let player3Scores = CreateLeaderboardScoreArr(player3Data['display_name'], player3Data[roundKey]['scores'], 'full')
  

  return (
    <Table hover bordered size='sm' className='m-0 p-0'>
      <thead>
        <PlayerScorecardHeaders headers={ScorecardDesktopHeaders} data={'holes-number'} />
        <PlayerScorecardHeaders headers={parArr} data={'holes-par'} />
      </thead>
      <tbody>
        <PlayerScorecardData scores={userScoresArr} pars={parArr} data={`all-scores-${roundKey}-${user_name}`} />
        <PlayerScorecardData scores={player1Scores} pars={parArr} data={`all-scores-${roundKey}--${user_name}-${player1Data['display_name']}`} />
        <PlayerScorecardData scores={player2Scores} pars={parArr} data={`all-scores-${roundKey}--${user_name}-${player2Data['display_name']}`} />
        <PlayerScorecardData scores={player3Scores} pars={parArr} data={`all-scores-${roundKey}--${user_name}-${player3Data['display_name']}`} />
      </tbody>
    </Table>    
  )

}

export default LeaderboardScorecardDesktop