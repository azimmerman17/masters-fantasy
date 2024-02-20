import { useContext } from "react"
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"

import { EventConfig } from "../../Contexts/EventConfig"
import { PlayersContext } from "../../Contexts/PlayersContext"
import { FantasyTournamentConfig } from "../../Contexts/FantasyTournamentConfig"

const UserRoster = () => {
  const { eventConfig, setEventConfig } = useContext(EventConfig)
  const { playersContext, setPlayersContext} = useContext(PlayersContext)
  const {fantasyTournamentConfig, setFantasyTournamentConfig} = useContext(FantasyTournamentConfig)


  if (eventConfig && playersContext) {
    return (
      <Container fluid>
        <Row>
          User Rank and Score
        </Row>
        <Row>
          User Roster 
        </Row>
        <Row>
          User Lineups
        </Row>
      </Container>
    )
  }
  
}

export default UserRoster