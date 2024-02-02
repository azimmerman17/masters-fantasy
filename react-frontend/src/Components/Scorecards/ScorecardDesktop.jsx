import Table from "react-bootstrap/Table"
import Container from "react-bootstrap/esm/Container"

import ScorecardDesktopHeaders from "../../assets/Files/ScorecardDesktopHeaders"
import PlayerScorecardHeaders from "./PlayerScorecardHeaders"
import PlayerScorecardData from "./PlayerScorecardData"
import RemoveValueArray from "../../Functions/RemoveValueArray"

const ScorecardDesktop = ({ r1, r2, r3, r4, pars, yardages }) => {
  let outYards = 0
  let inYards = 0
  let yardArr = ['Yards']
  let parArr = ['Par']
  let outPar = 0
  let inPar = 0

  let headers = ScorecardDesktopHeaders
  // remove out and in headers for small windows
  if (window.innerWidth < 1000) {
    headers = RemoveValueArray(ScorecardDesktopHeaders, 'Out')
    headers = RemoveValueArray(ScorecardDesktopHeaders, 'In')
  }


  for (let i = 0; i < yardages.length; i++) {
    yardArr.push(yardages[i])
    parArr.push(pars[i])
    
    if ( i < 9 ) {
      outYards += Number(yardages[i])
      outPar += Number(pars[i])
    } else {
      inYards += Number(yardages[i])
      inPar += Number(pars[i])
    }
    if (i === 8 && window.innerWidth >= 1000) {
      yardArr.push(outYards)
      parArr.push(outPar)
    } else if (i === 17 && window.innerWidth >= 1000) {
      yardArr.push(inYards)
      parArr.push(inPar)
    }

  }

  yardArr.push(outYards + inYards)
  parArr.push(outPar + inPar)

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

    let sideScore = 0
    for (let j = 0; j < round.length; j++) {
      roundArr.push(round[j])
      sideScore += round[j]
      if (j === 8 && window.innerWidth >= 1000 ) {
        roundArr.push(sideScore)
        sideScore = 0
      } else if (j === 17 && window.innerWidth >= 1000 ) roundArr.push(sideScore)
    }
    roundArr.push(totalScore)

    return roundArr
  }

  return (
    <Table hover bordered size='sm'>
      <thead>
        <PlayerScorecardHeaders headers={headers} data={'holes-number'} />
        <PlayerScorecardHeaders headers={parArr} data={'holes-par'} />
        {window.innerWidth > 1000 ? <PlayerScorecardHeaders headers={yardArr} data={'holes-yards'} /> : null}
      </thead>  
      <tbody>
         {r1.roundStatus === 'Pre' || r1.roundStatus === 'not-applicable' || !r1 ? null : <PlayerScorecardData scores={getScores('R1')} pars={parArr} data={`hole-scores-round-1`} />}
         {r2.roundStatus === 'Pre' || r2.roundStatus === 'not-applicable' || !r2 ? null : <PlayerScorecardData scores={getScores('R2')} pars={parArr} data={`hole-scores-round-2`} />}
         {r3.roundStatus === 'Pre' || r3.roundStatus === 'not-applicable' || !r3 ? null : <PlayerScorecardData scores={getScores('R3')} pars={parArr} data={`hole-scores-round-3`} />}
         {r4.roundStatus === 'Pre' || r4.roundStatus === 'not-applicable' || !r4 ? null : <PlayerScorecardData scores={getScores('R4')} pars={parArr} data={`hole-scores-round-4`} />}
      </tbody>
    </Table>
  )
}

export default ScorecardDesktop