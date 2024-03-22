import { useContext } from "react"
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { TournamentLeaderboardContext } from "../../../Contexts/TournamentLeaderboard";
import { PlayersContext } from "../../../Contexts/PlayersContext"
import LineupSelection from "./LinupSelection";


const LineupTab = ({ lineup, roster, round }) => {
  const { player1, player2, player3 } = lineup
  let roundLineup = [player1, player2, player3]
  const {tournamentLeaderboardContext, setTournamentLeaderboardContext} = useContext(TournamentLeaderboardContext)
  const {playersContext, setPlayersContext} = useContext(PlayersContext)


  const { past_champ, usa, intl, wild_card1, wild_card2, wild_card3 } = roster
  let playerList
  if (tournamentLeaderboardContext.leaderboard || playersContext) {
    if (tournamentLeaderboardContext.leaderboard) {
      const { leaderboard } = tournamentLeaderboardContext
      const { player } = leaderboard
      playerList = player
    } else if (playersContext) {
      const { players } = playersContext
      playerList = players
    }

    let playersRoster = [
      playerList.filter(rosterPlayer => rosterPlayer.id == String(past_champ))[0],
      playerList.filter(rosterPlayer => rosterPlayer.id == String(usa))[0],
      playerList.filter(rosterPlayer => rosterPlayer.id == String(intl))[0],
      playerList.filter(rosterPlayer => rosterPlayer.id == String(wild_card1))[0],
      playerList.filter(rosterPlayer => rosterPlayer.id == String(wild_card2))[0],
      playerList.filter(rosterPlayer => rosterPlayer.id == String(wild_card3))[0]
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