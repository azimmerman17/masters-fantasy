import Col from "react-bootstrap/Col"
import Container from "react-bootstrap/Container"
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import ScorecardMobile from "../../Scorecards/ScorecardsMobile";
import ScorecardDesktop from "../../Scorecards/ScorecardDesktop";

const PlayerPageScorecard = ({ currentRound, pars, yardages, golfer }) => {
  const { round1, round2, round3, round4 } = golfer
  const roundArr = []
  
  if (round1.roundStatus !== 'Pre' && window.innerWidth > 500) roundArr.push('Round 1')
  else if (round1.roundStatus !== 'Pre' && window.innerWidth < 500) roundArr.push('Rd 1')

  if (round2.roundStatus !== 'Pre' && window.innerWidth > 500) roundArr.push('Round 2')
  else if (round2.roundStatus !== 'Pre' && window.innerWidth < 500) roundArr.push('Rd 2')

  if (round3.roundStatus !== 'Pre' && window.innerWidth > 500) roundArr.push('Round 3')
  else if (round3.roundStatus !== 'Pre' && window.innerWidth < 500) roundArr.push('Rd 3')

  if (round4.roundStatus !== 'Pre' && window.innerWidth > 500) roundArr.push('Round 4')
  else if (round4.roundStatus !== 'Pre' && window.innerWidth < 500) roundArr.push('Rd 4')

  const roundTabs = roundArr.map((round, i) => {
    
    const roundPars = (rd) => {
      switch (rd) {
        case 0:
          return pars.round1
        case 1:
          return  pars.round2
        case 2:
          return  pars.round3
        case 3:
          return  pars.round4
      }
    }

    const roundScores = (rd) => {
      switch (rd) {
        case 0:
          return golfer.round1
        case 1:
          return  golfer.round2
        case 2:
          return  golfer.round3
        case 3:
          return  golfer.round4
      }
    }

    return (
      <Tab eventKey={round} title={round} key={i}>
        <ScorecardMobile round={i +1} pars={roundPars(i)} scores={roundScores(i)} /> 
      </Tab>
    )
  })

  return (
    <Container fluid className="m-0 p-0">
      {window.innerWidth < 775 ? (
        <>
          <h6 className='text-success text-end'>Offical Scorecard</h6>
          <Tabs defaultActiveKey={roundArr[roundArr.length - 1]} id="scorecard-tab-switcher" justify>
            {roundTabs}
          </Tabs>
        </>
      ) : (
        <>
          <h4 className='text-success text-start'>Offical Scorecard</h4>
          <ScorecardDesktop r1={round1} r2={round2} r3={round3} r4={round4} pars={pars.round1} yardages={yardages.round1}/>
        </>
      )}
    </Container>
  )
}

export default PlayerPageScorecard