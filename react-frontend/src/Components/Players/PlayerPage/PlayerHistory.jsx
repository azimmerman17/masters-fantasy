import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import RemoveValueArray from "../../../Functions/RemoveValueArray"

const PlayerHistory = ({ avgRound, bestFinish, cutsMade, highRound, lowRound, firsttimer, tournamentsPlayed, pastMasters,first_name, last_name }) => {
  let finish = bestFinish.split(' ')
  let finishPos = finish.shift()
  let finishYears = RemoveValueArray(finish, finishPos).join(' ')

  let data = [tournamentsPlayed, cutsMade, avgRound, highRound, lowRound]
  let labels = ['Tournaments Played', 'Cuts Made', 'Scoring Average', 'High Round', 'Low Round']
  
  const historyData = data.map((dataPoint, i) => {
    return (
      <Col key={`player-history-${i}`} xs={6} md={4} className='my-2'>
        <h6 className='fs-3 text-success text-center'>{dataPoint}</h6>
        <p className='m-0 label-small text-center'>{labels[i]}</p>
      </Col>
    )
  })

  if (firsttimer) {
    return (
      <Container fluid>
        <h5 className={`text-success ${window.innerWidth < 775 ? 'text-end' : 'text-start'}`}>Tournament History</h5>
        <p>{first_name} {last_name} is making his first apperence</p>
      </Container>
    )
  } else {

    return (
      <Container fluid>
        <h5 className={`text-success ${window.innerWidth < 775 ? 'text-end' : 'text-start'}`}>Tournament History</h5>
        <Row>
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

      </Container>
    )
  }

}

export default PlayerHistory