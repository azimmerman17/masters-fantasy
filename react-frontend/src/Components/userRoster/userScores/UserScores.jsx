import { useContext } from 'react'
import Accordion from 'react-bootstrap/Accordion';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import { TournamentLeaderboardContext } from '../../../Contexts/TournamentLeaderboard'
import CalculateRoundHoles from '../../../Functions/CalculateRoundHoles'
import ScoreColor from '../../../Functions/ScoreColor'

const UserScores = ({ scoring, lineups }) => {
  const { tournamentLeaderboardContext, setTournamentLeaderboardContext } = useContext(TournamentLeaderboardContext)

  if (tournamentLeaderboardContext.leaderboard && tournamentLeaderboardContext.pairings) {
    const { leaderboard } = tournamentLeaderboardContext
    const { player } = leaderboard
    const { holes_completed, rounds, total } = scoring
    const displayScore = (scores, label, lineup) => {
      const { player1, player2, player3 } = lineup
  
      const { aggr, score, stableford } = scores
      let { round } = scores
  
      let roundHoles
      if (round) roundHoles = holes_completed % 18
      let players = [
        player.filter(golfer => golfer.id == player1)[0],
        player.filter(golfer => golfer.id == player2)[0],
        player.filter(golfer => golfer.id == player3)[0],
      ]
  
      return (
        <Row className={`m-0 p-1  text-center ${label === 'Total' ? '' : 'rounded border shadow-sm border-primary'}`}>
          <h5>{label  === 'Total' ? '' : label}</h5>
          <Col>
            <h6 className={`m-auto ${ScoreColor(score)}`}>{score}</h6>
            <p className='label-small m-auto'>Score</p>
          </Col>
          <Col xs={4}>
            <h6 className='m-auto'>{stableford}</h6>
            <p className='label-small m-auto'>Stableford</p>
          </Col>
          {/* <Col xs={5}>
            <h6 className='m-auto'>{stableford}</h6>
            <p className='label-small m-auto'>Aggregate</p>
          </Col> */}
            <Col>
              <h6 className='m-auto'>{CalculateRoundHoles(holes_completed, round, players)}</h6>
              <p className='label-small m-auto'>Thru</p>
            </Col>
        </Row>
      )
    }
    
    const roundScores = rounds.map((round, i) => {
      if (holes_completed > i * 18) {
        return (
          <Col className='my-1 text-center' key={`score-round-${i + 1}`} xs={12} sm={6} lg={3}>
            {displayScore(round, `Round ${i + 1}`, lineups[i])}
          </Col>
        )
      }
    })

    return (
      <Accordion flush>
        <Accordion.Item eventKey="0">
          <Accordion.Header>
          <Row>
            <Col xs={12} md={6}>
              <h4>Fantasy Scoring</h4>
            </Col>
            <Col xs={12} md={6} className='my-1'>
              {holes_completed > 0 ? displayScore(total, 'Total', lineups[3]) : null}
            </Col>
            </Row>
          </Accordion.Header>
          <Accordion.Body className='p-1'>
            <Row>
              {/* <Col xs={12} className='my-1'>
                {holes_completed > 0 ? displayScore(total, 'Total', lineups[3]) : null}
              </Col> */}
                {roundScores}
            </Row>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    )
  } else return null
}

export default UserScores