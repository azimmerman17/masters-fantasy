import { useContext } from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'

import { FantasyTournamentConfig } from '../../Contexts/FantasyTournamentConfig'
import { PlayersContext } from '../../Contexts/PlayersContext'
import { CurrentUser } from '../../Contexts/CurrentUserContext'
import { TournamentLeaderboardContext } from '../../Contexts/TournamentLeaderboard'
import { UserRoster } from '../../Contexts/UserRosterContext'

import UserRosterSelection from './UserRosterSelection'
import UserLineups from './Lineups/UserLineups'
import UserScores from './UserScores/UserScores'

const UserRosterComponent = () => {
  const {playersContext, setPlayersContext} = useContext(PlayersContext)
  const {fantasyTournamentConfig, setFantasyTournamentConfig} = useContext(FantasyTournamentConfig)
  const {tournamentLeaderboardContext, setTournamentLeaderboardContext} = useContext(TournamentLeaderboardContext)
  const {currentUser, setCurrentUser} = useContext(CurrentUser)
  const {userRoster, setUserRoster} = useContext(UserRoster)
 
  if (fantasyTournamentConfig && playersContext  && currentUser && tournamentLeaderboardContext && userRoster) {
    const { players } = playersContext
    const { leaderboard } = tournamentLeaderboardContext
    const { currentRound } = fantasyTournamentConfig

    if (!leaderboard && !players) {
      return (
        <p className='my-3 text-center'>Roster Tools are unavablile please check back later</p>
      )
    }

    const { roster, lineups, scoring, golfers } = currentUser
    const { tourny_active } = fantasyTournamentConfig
    
    const showLineups = () => {
      const { intl, past_champ, usa, wild_card1, wild_card2, wild_card3 } = roster
      if (intl && past_champ && usa && wild_card1 && wild_card2 && wild_card3) return  <UserLineups lineups={lineups} roster={currentUser.roster} golfers={golfers} />
      return <p className='m-auto text-center'>A full roster is required to view and update lineups.</p>
    }

    return (
      <Container fluid>
        <Row>
          <UserScores scoring={scoring} lineups={lineups}/>
        </Row>
        <Row>
          <UserRosterSelection lineups={lineups} round={currentRound} golfers={golfers} />
        </Row>
        <Row>
          {showLineups()}
        </Row>
        <p className='my-3 text-center'><small>If your roster or lineup does not appear to have updated correctly, please refresh the page to verify the update occurred.</small></p>
      </Container>
    )
  }
}

export default UserRosterComponent