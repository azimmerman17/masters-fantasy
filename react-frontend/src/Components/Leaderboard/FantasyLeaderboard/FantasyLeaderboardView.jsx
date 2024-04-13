import {  useContext } from 'react'
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table'

import { CurrentUser } from '../../../Contexts/CurrentUserContext';
import { FantasyLeaderboard } from '../../../Contexts/FantasyLeaderboardContext'
import { EventConfig } from '../../../Contexts/EventConfig';
import { FantasyTournamentConfig } from '../../../Contexts/FantasyTournamentConfig'
import Login from '../../Login'
import LeaderboardTableHeader from '../LeaderboardTableHeaders';
import FantasyLeaderboardHeaders from '../../../assets/Files/FantasyLeaderboardHeaders'
import LeaderboardTableData from '../LeaderboardTableData';

const FantasyLeaderboardView = ({}) => {
  const { currentUser, setCurrentUser} = useContext(CurrentUser)
  const { fantasyLeaderboard, setFantasyLeaderboard } = useContext(FantasyLeaderboard)
  const { eventConfig, setEventConfig } = useContext(EventConfig)
  const { fantasyTournamentConfig, setFantasyTournamentConfig }  = useContext(FantasyTournamentConfig)

  // intailize the tournament Year - default to current
  let displayYear = (new Date()).getFullYear()
  // Set the Year to match in the Event Config
  if (eventConfig) {
    const { dataSettings } = eventConfig
    const {tournamentYear } = dataSettings
    displayYear = tournamentYear
  }

  //validation if the leaderboard should be shown
  const display = () => {
    if (!currentUser) return  <Login />
    else if (fantasyLeaderboard === 'Pending') return null

    else {
      //Leaderboard Table
      const { currentRound } = fantasyTournamentConfig
      const playerList = fantasyLeaderboard.map(player => {
        const { user_name } = player

        const rowData = FantasyLeaderboardHeaders.map(header => {
          return <LeaderboardTableData player={player} header={header} view={'fantasy'} round={currentRound} key={`leaderboard-${user_name}-row-${header}`} />
        })

        return (
          <tr key={`leaderboard-${user_name}-row`}>
            {rowData}
          </tr>
        )
      })

      return (
        <>
          <h6 className='px-1 mx-1 mt-2'>Round {currentRound}</h6>
          <Table
            className='mx-0 mb-0 my-auto'
            size='sm'
            hover
            responsive
          >
            <thead>
              <LeaderboardTableHeader headers={FantasyLeaderboardHeaders} />
            </thead>
            <tbody>
              {playerList}

            </tbody>
          </Table>
          <p className='mt-3 text-center'>
            <small>
              Only players with a full roster will appear on the leaderboard - Rosters lock at the start of the Master's Tournament
            </small>
          </p>
        </>
      )
    }
  }

  if (!fantasyTournamentConfig) return null
  return (
    <Container fluid>
      <h4 className=' my-3 text-center'>{displayYear} Fantasy Leaderboard</h4>
      {fantasyLeaderboard ? display() : ( 
        <p className='my-3 text-center'>
          The leaderboard is not avaible at this time please check back later.
        </p>
      )}
    </Container>
  ) 
}

export default FantasyLeaderboardView