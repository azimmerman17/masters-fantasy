import { useContext } from "react"
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"

import { TournamentLeaderboardContext } from "../../../Contexts/TournamentLeaderboard"
import CalculateRoundHoles from "../../../Functions/CalculateRoundHoles"
import ScoreColor from "../../../Functions/ScoreColor"

const UserScores = ({ scoring, lineups }) => {
  const { tournamentLeaderboardContext, setTournamentLeaderboardContext } = useContext(TournamentLeaderboardContext)
  
  if (tournamentLeaderboardContext) {
    const { leaderboard } = tournamentLeaderboardContext
    const { player } = leaderboard
    const { holes_completed, rounds, total } = scoring
    
    const displayScore = (scores, label, lineup) => {
      const { player1, player2, player3 } = lineup
  
      const { aggr, score } = scores
      let { round } = scores
  
      let roundHoles
      if (round) roundHoles = holes_completed % 18
      let players = [
        player.filter(golfer => golfer.id == player1)[0],
        player.filter(golfer => golfer.id == player2)[0],
        player.filter(golfer => golfer.id == player3)[0],
      ]
  
      return (
        <Row className='m-0 p-1 border rounded'>
          <h5>{label}</h5>
          <Col>
            <h6 className={`m-auto ${ScoreColor(score)}`}>{score}</h6>
            <p className='label-small m-auto'>Score</p>
          </Col>
          <Col xs={5}>
            <h6 className='m-auto'>{aggr}</h6>
            <p className='label-small m-auto'>Aggregate Score</p>
          </Col>
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
          <Col className='m-1' key={`score-round-${i + 1}`} xs={12} sm={12}>
            {displayScore(round, `Round ${i + 1}`, lineups[i])}
          </Col>
        )
      }
    })
    
    return (
      <Container className='text-center' fluid>
        <h4>Fantasy Comptetion Score</h4>
        <Row>
          <Col xs={12} sm={6} className='m-1'>
            {holes_completed > 0 ? displayScore(total, 'Total', lineups[3]) : null}
          </Col>
            {roundScores}
        </Row>
      </Container>
    
    )
  }
}

export default UserScores