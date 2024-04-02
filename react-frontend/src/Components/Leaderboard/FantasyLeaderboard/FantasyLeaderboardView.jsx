import {  useContext } from 'react'
import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table"

import { FantasyLeaderboard } from '../../../Contexts/FantasyLeaderboardContext'
import { EventConfig } from '../../../Contexts/EventConfig';
import Login from '../../Login'
import LeaderboardTableHeader from '../LeaderboardTableHeaders';
import FantasyLeaderboardHeaders from '../../../assets/Files/FantasyLeaderboardHeaders'
import LeaderboardTableData from '../LeaderboardTableData';

const FantasyLeaderboardView = ({}) => {
  const { fantasyLeaderboard, setFantasyLeaderboard } = useContext(FantasyLeaderboard)
  const { eventConfig, setEventConfig } = useContext(EventConfig)
  
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
    if (fantasyLeaderboard === 'Pending') return null
    else if (fantasyLeaderboard === 'Login Required') return  <Login />
    else {
      //Leaderboard Table
      const playerList = fantasyLeaderboard.map(player => {
        const { user_name } = player

        const rowData = FantasyLeaderboardHeaders.map(header => {
          return <LeaderboardTableData player={player} header={header} view={'fantasy'} key={`leaderboard-${user_name}-row-${header}`} />
        })

        return (
          <tr key={`leaderboard-${user_name}-row`}>
            {rowData}
          </tr>
        )
      })

      return (
        <>
          <Table
            className='mx-0 mt-2 mb-0 my-auto'
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