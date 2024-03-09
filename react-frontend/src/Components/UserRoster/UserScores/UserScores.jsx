import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"

import CalculateRoundHoles from "../../../Functions/CalculateRoundHoles"

const UserScores = ({ scoring }) => {
  const { holes_completed, rounds, total } = scoring
  
  const displayScore = (scores, label) => {
    const { aggr, score } = scores
    let { round } = scores

    let roundHoles
    if (round) roundHoles = holes_completed % 18

    return (
      <Row className='m-0 p-1 border rounded'>
        <h5>{label}</h5>
        <Col>
          <h6 className='m-auto'>{score}</h6>
          <p className='label-small m-auto'>score</p>
        </Col>
        <Col xs={5}>
          <h6 className='m-auto'>{aggr}</h6>
          <p className='label-small m-auto'>Aggregate Score</p>
        </Col>
          <Col>
            <h6 className='m-auto'>{CalculateRoundHoles(holes_completed, round)}</h6>
            <p className='label-small m-auto'>Thru</p>
          </Col>
      </Row>
    )
  }
  
  const roundScores = rounds.map((round, i) => {
    console.log(round, i)
    if (holes_completed > i * 18) {
      return (
        <Col className='m-1' key={`score-round-${i + 1}`} xs={12}>
          {displayScore(round, `Round ${i + 1}`)}
        </Col>
      )
    }
  })
  
  return (
    <Container className='text-center' fluid>
      <h4>Fantasy Comptetion Score</h4>
      <Row>
        <Col xs={12} className='m-1'>
          {holes_completed > 0 ? displayScore(total, 'Total') : null}
        </Col>
          {roundScores}
      </Row>
    </Container>
  
  )
}

export default UserScores