import { useContext } from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'

import { FantasyTournamentConfig } from '../../Contexts/FantasyTournamentConfig'
import { PlayersContext } from '../../Contexts/PlayersContext'
import { CurrentUser } from '../../Contexts/CurrentUserContext'
import { TournamentLeaderboardContext } from '../../Contexts/TournamentLeaderboard'
import UserRosterSelection from './UserRosterSelection'
import UserLineups from './Lineups/UserLineups'
import UserScores from './UserScores/UserScores'

const UserRoster = () => {
  const {playersContext, setPlayersContext} = useContext(PlayersContext)
  const {fantasyTournamentConfig, setFantasyTournamentConfig} = useContext(FantasyTournamentConfig)
  const {tournamentLeaderboardContext, setTournamentLeaderboardContext} = useContext(TournamentLeaderboardContext)
  const {currentUser, setCurrentUser} = useContext(CurrentUser)

console.log(fantasyTournamentConfig)

  if (fantasyTournamentConfig && playersContext  && currentUser && tournamentLeaderboardContext) {
    const { players } = playersContext
    const { leaderboard } = tournamentLeaderboardContext
    if (!leaderboard && !players) {
      return (
        <p className='my-3 text-center'>Roster Tools are unavablile please check back later</p>
      )
    }

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