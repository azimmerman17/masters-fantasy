import { useContext } from "react"
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"

import { EventConfig } from "../../Contexts/EventConfig"
import { PlayersContext } from "../../Contexts/PlayersContext"
import { FantasyTournamentConfig } from "../../Contexts/FantasyTournamentConfig"
import { CurrentUser } from "../../Contexts/CurrentUserContext"
import UserRosterSelection from "./UserRosterSelection"

const UserRoster = () => {
  const { eventConfig, setEventConfig } = useContext(EventConfig)
  const { playersContext, setPlayersContext} = useContext(PlayersContext)
  const {fantasyTournamentConfig, setFantasyTournamentConfig} = useContext(FantasyTournamentConfig)
  const {currentUser, setCurrentUser} = useContext(CurrentUser)

  if (eventConfig && playersContext && fantasyTournamentConfig  && currentUser) {
    const { roster } = currentUser
    const { rosterLock } = fantasyTournamentConfig

    return (
      <Container fluid>
        <Row>
          User Rank and Score
        </Row>
        <Row>
          <UserRosterSelection roster={roster} locked={rosterLock} />
        </Row>
        <Row>
          User Lineups
        </Row>
      </Container>
    )
  }
  
}

export default UserRoster