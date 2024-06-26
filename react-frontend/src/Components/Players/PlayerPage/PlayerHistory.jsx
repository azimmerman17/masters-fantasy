import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import RemoveValueArray from '../../../Functions/RemoveValueArray'
import PlayerHistoryAccordion from '../PlayerHistoryAccordions'

const PlayerHistory = ({ bio }) => {
  const { player } = bio
  const { avgRound, bestFinish, cutsMade, highRound, lowRound, tournamentsPlayed, pastMasters, first_name, last_name, roundsPlayed, roundsUnderPar } = player

  let finish = bestFinish.split(' ')
  let finishPos = finish.shift()
  let finishYears = RemoveValueArray(finish, finishPos).join(' ')

  let data = [tournamentsPlayed, cutsMade, roundsPlayed, roundsUnderPar, avgRound, highRound, lowRound ]
  let labels = ['Tournaments Played', 'Cuts Made',  'Rounds Played', 'Rounds Under Par', 'Scoring Average', 'High Round', 'Low Round']
  
  const historyData = data.map((dataPoint, i) => {
    return (
      <Col key={`player-history-${i}`} xs={6} md={4} className='my-2'>
        <h6 className='fs-3 text-success text-center'>{dataPoint}</h6>
        <p className='m-0 label-small text-center'>{labels[i]}</p>
      </Col>
    )
  })

  if (pastMasters.length === 0) {
    return (
      <Container fluid>
        <h5 className={`text-success ${window.innerWidth < 775 ? 'text-end' : 'text-start'}`}>Tournament History</h5>
        <p>{first_name} {last_name} is making his first apperence</p>
      </Container>
    )
  } else {
    return (
      <Container fluid className='m-1 p-0'>
        <h5 className={`text-success ${window.innerWidth < 775 ? 'text-end' : 'text-start'}`}>Tournament History</h5>
        <Row className='m-1 p-0'>
          <Col xs={4} md={3} className='border border-2 border-success rounded'>
            <Row className='mb-1'>
              <h5 className='mb-2 mt-1 fs-6  text-center'>Best Finish</h5>
              <h6 className='text-center text-success fs-1 font-bolder'>{finishPos}</h6>
              <p className='text-center m-0'>{finishYears}</p>
            </Row>
          </Col>
          <Col xs={8} md={9}>
            <Row>
              {historyData}
            </Row>
          </Col>
        </Row>
        <hr className='my-2' />
        <Row>
          <PlayerHistoryAccordion pastMasters={pastMasters} />
        </Row>
      </Container>
    )
  }

}

export default PlayerHistory