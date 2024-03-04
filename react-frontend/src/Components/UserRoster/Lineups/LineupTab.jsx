import { useContext, useState } from "react"
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { TournamentLeaderboardContext } from "../../../Contexts/TournamentLeaderboard";
import LineupSelection from "./LinupSelection";


const LineupTab = ({ lineup, roster, round }) => {
  const { player1, player2, player3 } = lineup
  let [roundLineup, setRoundLineup] = useState([player1, player2, player3])
  const {tournamentLeaderboardContext, setTournamentLeaderboardContext} = useContext(TournamentLeaderboardContext)

  const { past_champ, usa, intl, wild_card1, wild_card2, wild_card3 } = roster
  if (tournamentLeaderboardContext) {
    const { leaderboard } = tournamentLeaderboardContext
    const { player } = leaderboard

    let playersRoster = [
      player.filter(rosterPlayer => rosterPlayer.id == String(past_champ))[0],
      player.filter(rosterPlayer => rosterPlayer.id == String(usa))[0],
      player.filter(rosterPlayer => rosterPlayer.id == String(intl))[0],
      player.filter(rosterPlayer => rosterPlayer.id == String(wild_card1))[0],
      player.filter(rosterPlayer => rosterPlayer.id == String(wild_card2))[0],
      player.filter(rosterPlayer => rosterPlayer.id == String(wild_card3))[0]
    ]

    const lineupSpot = roundLineup.map((playerId, i) => {
      let lineupSpot 
      switch (i) {
        case 0:
          lineupSpot = 'player1'
          break
        case 1:
          lineupSpot = 'player2'
          break
        case 2:
          lineupSpot = 'player3'
          break

      }
      
      return (
        <LineupSelection playersRoster={playersRoster} player={playerId} roundLineup={roundLineup} round={round} lineupSpot={lineupSpot} key={`Lineup-selection-${playerId}-${lineupSpot}`}/>
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