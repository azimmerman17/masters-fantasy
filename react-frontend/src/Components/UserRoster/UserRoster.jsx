import { useContext } from "react"
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"

import { EventConfig } from "../../Contexts/EventConfig"
import { PlayersContext } from "../../Contexts/PlayersContext"
import { FantasyTournamentConfig } from "../../Contexts/FantasyTournamentConfig"
import { CurrentUser } from "../../Contexts/CurrentUserContext"
import UserRosterSelection from "./UserRosterSelection"
import UserLineups from "./Lineups/UserLineups"

const UserRoster = () => {
  const { eventConfig, setEventConfig } = useContext(EventConfig)
  const { playersContext, setPlayersContext} = useContext(PlayersContext)
  const {fantasyTournamentConfig, setFantasyTournamentConfig} = useContext(FantasyTournamentConfig)
  const {currentUser, setCurrentUser} = useContext(CurrentUser)

  if (eventConfig && playersContext && fantasyTournamentConfig  && currentUser) {
    const { roster, lineups } = currentUser
    const { rosterLock } = fantasyTournamentConfig

    return (
      <Container fluid>
        <Row>
          User Rank and Score
        </Row>
        <Row>
          <h4 className='text-center'>Roster</h4>
          <UserRosterSelection roster={roster} locked={rosterLock} />
        </Row>
        <Row>
          <h4 className='text-center'>Lineups</h4>
          <UserLineups lineups={lineups} roster={roster} />
        </Row>
      </Container>
    )
  }
  
}

export default UserRoster