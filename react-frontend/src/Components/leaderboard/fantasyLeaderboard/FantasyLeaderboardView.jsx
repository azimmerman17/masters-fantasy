import { useContext } from 'react'
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table'
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import { FantasyLeaderboard } from '../../../Contexts/FantasyLeaderboardContext'
import { EventConfig } from '../../../Contexts/EventConfig';
import { FantasyTournamentConfig } from '../../../Contexts/FantasyTournamentConfig'
import Login from '../../Login'
import LeaderboardTableHeader from '../LeaderboardTableHeaders';
import FantasyLeaderboardHeaders from '../../../assets/Files/FantasyLeaderboardHeaders'
import FantasyLeaderboardBody from './FantasyLeaderboardBody';
import Loading from '../../Loading';
import FormatTime from '../../../Functions/FormatTime';


const FantasyLeaderboardView = ({}) => {
  const { fantasyTournamentConfig, setFantasyTournamentConfig }  = useContext(FantasyTournamentConfig)
  const { fantasyLeaderboard, setFantasyLeaderboard } = useContext(FantasyLeaderboard)
  const { eventConfig, setEventConfig } = useContext(EventConfig)
  
  // require login to view
  if (!localStorage.token) return  <Login />

  // intailize the tournament Year - default to current
  let displayYear = (new Date()).getFullYear()
  // Set the Year to match in the Event Config
  if (eventConfig) {
    const { dataSettings } = eventConfig
    const {tournamentYear } = dataSettings
    displayYear = tournamentYear
  }

  const display = () => {
    const { currentRound, tourny_active, round_active } = fantasyTournamentConfig
    const { leaderboard, lineups } = fantasyLeaderboard
    console.log(fantasyTournamentConfig)
    //validation if the leaderboard should be shown
    if (!tourny_active || tourny_active ==='P') {
      return (
        <p className='my-3 text-center'>
          The leaderboard is not avaible at this time please check back later.
        </p>
      )
    }

    const playerList = leaderboard.map(player => {
      const { user_name } = player
      const lineup = lineups.filter(lineup => lineup.user_name === user_name)[0]
      return <FantasyLeaderboardBody player={player} round={currentRound} lineup={lineup} key={`leaderboard-${user_name}-row`}/>
    })

    const displayLock = (round) => {
      const  {round1Lock, round2Lock, round3Lock, round4Lock} = fantasyTournamentConfig
      let lockDate 
      switch (round) {
        case 1:
          lockDate = new Date(round1Lock)
          break
        case 2:
          lockDate = new Date(round2Lock)
          break
        case 3:
          lockDate = new Date(round3Lock)
          break
        case 4:
          lockDate = new Date(round4Lock)
          break
      }

      return( <p className='m-0'><small>Lineups Lock: {FormatTime(lockDate)} ET</small></p>)
    }

    return (
      <>
        <Row className='px-1 mx-1 mt-2'>
          <Col xs={4}>
            <h6>Round {currentRound}</h6>
          </Col>
          <Col xs={8} className='text-end'>
            <h6>{round_active === 'P' ? displayLock(currentRound) : 'Lineups Locked'}</h6>
          </Col>
        </Row>
        <Table
          className='mx-0 mb-0 my-auto'
          size='sm'
          hover
          responsive
        >
          <thead>
            <LeaderboardTableHeader headers={FantasyLeaderboardHeaders} />
          </thead>
              {playerList}
        </Table>
        <p className='mt-3 text-center'>
          All times displayed in Eastern Time
        </p>
        <p className='mt-3 text-center'>
          <small>
            Only players with a full roster will appear on the leaderboard - Rosters lock at the start of the Master's Tournament
          </small>
        </p>
      </>
    )
  }

  return (
    <Container fluid>
      <h4 className=' my-3 text-center'>{displayYear} Fantasy Leaderboard</h4>
      {fantasyLeaderboard && fantasyTournamentConfig ? display() : <Loading />}
      {/* {display()} */}
    </Container>
  ) 
}


export default FantasyLeaderboardView