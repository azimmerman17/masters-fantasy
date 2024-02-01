import Table from "react-bootstrap/Table"

import ScorecardMobileHeaders from "../../assets/Files/ScorecardMobileHeders"
import PlayerScorecardHeaders from "./PlayerScorecardHeaders"
import PlayerScorecardData from "./PlayerScorecardData"

const ScorecardMobile = ({ round, pars, scores }) => {

  // create arrays to headle the scorecard headers
  const outPars = ['Par']
  const inPars = ['Par']

  let outPar = 0
  let inPar = 0

  for (let i = 0; i < pars.length; i++) {
    if (i < 9) {
      outPars.push(pars[i])
      outPar += pars[i]
    }
    else {
      inPars.push(pars[i])
      inPar += pars[i]
    }
  }

  outPars.push(outPar , outPar + inPar )
  inPars.push(inPar, outPar + inPar)

  // Arrays to handle the Plyer's Score
  let inScoreArr = [`Rd ${round}`]
  let outScoreArr = [`Rd ${round}`]

  let outScore = 0
  let inScore = 0

  for (let i = 0; i < 18; i++) {
    if (i < 9) {
      if (scores.scores.length > i) {
        outScoreArr.push(scores.scores[i])
        outScore += scores.scores[i]
      }
      else outScoreArr.push('')
    } else {
      if (scores.scores.length > i) {
        inScoreArr.push(scores.scores[i])
        inScore += scores.scores[i]
      }
      else inScoreArr.push('')
    }
  }

  inScoreArr.push(outScore , outScore + inScore)
  outScoreArr.push(inScore, outScore + inScore)

  return (
    <Table hover bordered size='sm'>
      <thead>
          <PlayerScorecardHeaders headers={ScorecardMobileHeaders[0]} data={`out-holes-${round}`} />
          <PlayerScorecardHeaders headers={outPars} data={`out-pars-${round}`} />
      </thead>
      <tbody>
          <PlayerScorecardData scores={outScoreArr} pars={outPars} data={`out-scores-${round}`} />
      </tbody>
      <thead>
          <PlayerScorecardHeaders headers={ScorecardMobileHeaders[1]} data={`in-holes-${round}`} />
          <PlayerScorecardHeaders headers={inPars} data={`in-pars-${round}`} />
      </thead>
      <tbody>
        <PlayerScorecardData scores={inScoreArr} pars={inPars} data={`in-scores-${round}`} />
      </tbody>
    </Table>    
  )
}

export default ScorecardMobile