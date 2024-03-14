import {  useContext } from 'react'
import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table"

import { FantasyLeaderboard } from '../../../Contexts/FantasyLeaderboardContext'
import { EventConfig } from '../../../Contexts/EventConfig';
import Login from '../../Login'
import LeaderboardTableHeader from '../LeaderboardTableHeaders';
import FantasyLeaderboardHeaders from '../../../assets/Files/FantasyLeaderboardHeaders'

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

            </tbody>
          </Table>
          <p className='mt-3'>
            <small>
              - If a player is THRU 18, they have scores for each hole, but still have golfers on the course.  THRU F, indicates all the player's golfers have completed thier round.
            </small>
            </p>
            <p className='mt-3'>

          </p>

        </>
      )
    }
  }

  


    return (
      <Container fluid>
        <h4 className=' my-3 text-center'>{displayYear} Fantasy Leaderboard</h4>
        {fantasyLeaderboard ? display() : null}
      </Container>
    ) 
  
}

export default FantasyLeaderboardView