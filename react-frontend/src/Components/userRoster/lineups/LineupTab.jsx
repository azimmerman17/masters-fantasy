import { useContext, useState, useEffect } from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { PlayersContext } from '../../../Contexts/PlayersContext'
import LineupSelection from './LinupSelection';


const LineupTab = ({ lineup, roster, round, golfers }) => {
  const { player1, player2, player3 } = lineup
  let [roundLineup, setRoundLineup] = useState([player1, player2, player3])
  const {playersContext, setPlayersContext} = useContext(PlayersContext)


  const { past_champ, usa, intl, wild_card1, wild_card2, wild_card3 } = roster
  if ( playersContext) {
    const { players } = playersContext

    let playerRoster = [
      {
        player: players.filter(player => player.id == String(past_champ))[0],
        stats: golfers.filter(golfer => golfer.golfer_id == String(past_champ))[0],
      }, { 
        player: players.filter(player => player.id == String(usa))[0],
        stats: golfers.filter(golfer => golfer.golfer_id == String(usa))[0],

      }, {
        player: players.filter(player => player.id == String(intl))[0],
        stats: golfers.filter(golfer => golfer.golfer_id == String(intl))[0],

      }, {
        player: players.filter(player => player.id == String(wild_card1))[0],
        stats: golfers.filter(golfer => golfer.golfer_id == String(wild_card1))[0],

      }, {
        player: players.filter(player => player.id == String(wild_card2))[0],
        stats: golfers.filter(golfer => golfer.golfer_id == String(wild_card2))[0],

      }, {
        player: players.filter(player => player.id == String(wild_card3))[0],
        stats: golfers.filter(golfer => golfer.golfer_id == String(wild_card3))[0],
      }
    ]

    const lineupSpot = roundLineup.map((id, i) => {

      let spot 
      switch (i) {
        case 0:
          spot = 'player1'
          break
        case 1:
          spot = 'player2'
          break
        case 2:
          spot = 'player3'
          break
      }
      
      return (
        <LineupSelection playerRoster={playerRoster} id={id} roundLineup={roundLineup} setRoundLineup={setRoundLineup} round={round} spot={spot} key={`Lineup-selection-${round}-${spot}`}/>
      )
    })

    return (
      <Container fluid>
        <Row>
          <Col>
            {lineupSpot}
          </Col>
        </Row>
      </Container>
    )
  }
}

export default LineupTab