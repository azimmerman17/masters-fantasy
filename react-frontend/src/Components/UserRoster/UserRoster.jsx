import { useContext } from "react"
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"

import { FantasyTournamentConfig } from "../../Contexts/FantasyTournamentConfig"
import { CurrentUser } from "../../Contexts/CurrentUserContext"
import UserRosterSelection from "./UserRosterSelection"
import UserLineups from "./Lineups/UserLineups"
import UserScores from "./UserScores/UserScores"

const UserRoster = () => {
  const {fantasyTournamentConfig, setFantasyTournamentConfig} = useContext(FantasyTournamentConfig)
  const {currentUser, setCurrentUser} = useContext(CurrentUser)

  if (fantasyTournamentConfig  && currentUser) {
    const { roster, lineups, scoring } = currentUser
    const { intl, past_champ, usa, wild_card1, wild_card2, wild_card3 } = roster
    const { rosterLock } = fantasyTournamentConfig

    const showLineups = () => {
      if (intl && past_champ && usa && wild_card1 && wild_card2 && wild_card3) return  <UserLineups lineups={lineups} roster={roster} />
      return <p className='m-auto text-center'>A full roster is required to view and update lineups.</p>
    }

    return (
      <Container fluid>
        <Row>
          <UserScores scoring={scoring} lineups={lineups}/>
        </Row>
        <Row>
          <h4 className='text-center'>Roster</h4>
          <UserRosterSelection roster={roster} locked={rosterLock} />
        </Row>
        <Row>
          <h4 className='text-center'>Lineups</h4>
          {showLineups()}
        </Row>
      </Container>
    )
  }
  
}

export default UserRoster