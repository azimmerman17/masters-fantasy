import Table from "react-bootstrap/Table"
import Container from "react-bootstrap/esm/Container"

import ScorecardDesktopHeaders from "../../assets/Files/ScorecardDesktopHeaders"
import PlayerScorecardHeaders from "./PlayerScorecardHeaders"
import PlayerScorecardData from "./PlayerScorecardData"

const ScorecardDesktop = ({ r1, r2, r3, r4, pars, yardages }) => {
  let totalYards = 0
  let yardArr = ['Yards']
  let parArr = ['Par']
  let totalPar = 0

  for (let i = 0; i < yardages.length; i++) {
    yardArr.push(yardages[i])
    totalYards += Number(yardages[i])
    parArr.push(pars[i])
    totalPar += Number(pars[i])
  }

  yardArr.push(totalYards)
  parArr.push(totalPar)

  // build the scores array
  const getScores = (r) => {
    let totalScore = null
    let round = null
    let roundArr = [r]

    switch (r) {
      case 'R1':
        round = r1.scores
        totalScore = r1.total
        break
      case 'R2':
        round = r2.scores
        totalScore = r2.total
        break
      case 'R3':
        round = r3.scores
        totalScore = r3.total
        break
      case 'R4':
        round = r4.scores
        totalScore = r4.total
        break
    }

    for (let j = 0; j < round.length; j++) {
      roundArr.push(round[j])
    }
    roundArr.push(totalScore)

    return roundArr
  }

  return (
    <Table hover bordered size='sm'>
      <thead>
        <PlayerScorecardHeaders headers={ScorecardDesktopHeaders} data={'holes-number'} />
        <PlayerScorecardHeaders headers={parArr} data={'holes-par'} />
        {window.innerWidth > 1000 ? <PlayerScorecardHeaders headers={yardArr} data={'holes-yards'} /> : null}
      </thead>  
      <tbody>
         {r1.roundStatus !== 'Pre' || r1.roundStatus !== 'not-applicable' ? <PlayerScorecardData scores={getScores('R1')} pars={parArr} data={`hole-scores-round-1`} /> : null}
         {r2.roundStatus !== 'Pre' || r2.roundStatus !== 'not-applicable' ? <PlayerScorecardData scores={getScores('R2')} pars={parArr} data={`hole-scores-round-2`} /> : null}
         {r3.roundStatus !== 'Pre' || r3.roundStatus !== 'not-applicable' ? <PlayerScorecardData scores={getScores('R3')} pars={parArr} data={`hole-scores-round-3`} /> : null}
         {r4.roundStatus !== 'Pre' || r4.roundStatus !== 'not-applicable' ? <PlayerScorecardData scores={getScores('R4')} pars={parArr} data={`hole-scores-round-4`} /> : null}
      </tbody>
    </Table>
  )
}

export default ScorecardDesktop