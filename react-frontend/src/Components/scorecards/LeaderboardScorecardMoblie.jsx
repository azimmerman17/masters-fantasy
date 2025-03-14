import Table from 'react-bootstrap/Table'

import LeaderBoardScorecardMobileHeaders from '../../assets/Files/LeaderBoardScorecardMobileHeaders'
import PlayerScorecardHeaders from './PlayerScorecardHeaders'
import PlayerScorecardData from './PlayerScorecardData'
import GetUserScores from '../../Functions/GetUserScores'
import CreateLeaderboardScoreArr from '../../Functions/CreateLeaderboardScoreArr'

const LeaderboardScorecardMobile = ({ player1Data, player2Data, player3Data, user_name, roundKey, pars }) => {
  // calculate user scores
  const userScores =  GetUserScores(player1Data[roundKey]['scores'], player2Data[roundKey]['scores'], player3Data[roundKey]['scores'])
  
 //create arrays to headle the scorecard headers
  let outPars = ['Par']
  let inPars = ['Par']
  let outPar = 0
  let inPar = 0

  for (let i = 0; i < pars.length; i++) {
    if (i < 9) {
      outPars.push(pars[i])
      outPar += pars[i]
    } else {
      inPars.push(pars[i])
      inPar += pars[i]
    }
  }

  outPars.push(outPar)
  inPars.push(inPar)

  // Arrays to handle the user's Score
  let userInScores = CreateLeaderboardScoreArr(user_name, userScores, 'in')
  let userOutScores = CreateLeaderboardScoreArr(user_name, userScores, 'out')

  //Arrays for player's Scors
  let player1InScores = CreateLeaderboardScoreArr(player1Data['display_name'], player1Data[roundKey]['scores'], 'in')
  let player1OutScores = CreateLeaderboardScoreArr(player1Data['display_name'], player1Data[roundKey]['scores'], 'out')

  let player2InScores = CreateLeaderboardScoreArr(player2Data['display_name'], player2Data[roundKey]['scores'], 'in')
  let player2OutScores = CreateLeaderboardScoreArr(player2Data['display_name'], player2Data[roundKey]['scores'], 'out')

  let player3InScores = CreateLeaderboardScoreArr(player3Data['display_name'], player3Data[roundKey]['scores'], 'in')
  let player3OutScores = CreateLeaderboardScoreArr(player3Data['display_name'], player3Data[roundKey]['scores'], 'out')

  return (
    <Table hover bordered size='sm' className='m-0 p-0'>
      <thead>
        <PlayerScorecardHeaders headers={LeaderBoardScorecardMobileHeaders[0]} data={`out-holes-${roundKey}`} />
        <PlayerScorecardHeaders headers={outPars} data={`out-pars-${roundKey}-${user_name}`} />
      </thead>
      <tbody>
        <PlayerScorecardData scores={userOutScores} pars={outPars} data={`out-scores-${roundKey}-${user_name}`} />
        <PlayerScorecardData scores={player1OutScores} pars={outPars} data={`out-scores-${roundKey}--${user_name}-${player1Data['display_name']}`} />
        <PlayerScorecardData scores={player2OutScores} pars={outPars} data={`out-scores-${roundKey}--${user_name}-${player2Data['display_name']}`} />
        <PlayerScorecardData scores={player3OutScores} pars={outPars} data={`out-scores-${roundKey}--${user_name}-${player3Data['display_name']}`} />
      </tbody>
      <thead>
        <PlayerScorecardHeaders headers={LeaderBoardScorecardMobileHeaders[1]} data={`in-holes-${roundKey}`} />
        <PlayerScorecardHeaders headers={inPars} data={`in-pars-${roundKey}-${user_name}`} />
      </thead>
      <tbody>
        <PlayerScorecardData scores={userInScores} pars={inPars} data={`in-scores-${roundKey}-${user_name}`} />
        <PlayerScorecardData scores={player1InScores} pars={inPars} data={`in-scores-${roundKey}--${user_name}-${player1Data['display_name']}`} />
        <PlayerScorecardData scores={player2InScores} pars={inPars} data={`in-scores-${roundKey}--${user_name}-${player2Data['display_name']}`} />
        <PlayerScorecardData scores={player3InScores} pars={inPars} data={`in-scores-${roundKey}--${user_name}-${player3Data['display_name']}`} />
      </tbody>
    </Table>    
  )
 }

export default LeaderboardScorecardMobile