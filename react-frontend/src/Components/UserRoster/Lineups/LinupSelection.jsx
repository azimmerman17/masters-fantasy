import { useContext, useEffect, useState } from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/Image'
import Alert from 'react-bootstrap/esm/Alert';


import { EventConfig } from '../../../Contexts/EventConfig'
import { FantasyTournamentConfig } from '../../../Contexts/FantasyTournamentConfig'
import SelectionDropdown from './SelectionDropDown'


const LineupSelection =({ playersRoster, player, roundLineup, setRoundLineup, round, lineupSpot }) => {
  const { eventConfig, setEventConfig } = useContext(EventConfig)
  const {fantasyTournamentConfig, setFantasyTournamentConfig} = useContext(FantasyTournamentConfig)

  let [showLock, setShowLock] = useState(false) 
  
  if (eventConfig && fantasyTournamentConfig) {

    const { round1Lock, round2Lock, round3Lock, round4Lock, currentRound, round_active } = fantasyTournamentConfig 
    const { dataSettings } = eventConfig
    const { tournamentYear } = dataSettings
    let picture = `https://images.masters.com/players/${tournamentYear}/240x240/${player}.jpg`

    let lock = true
    switch (round) {
      case 1:
        lock = new Date(round1Lock * 1000)
        break
      case 2:
        lock = new Date(round2Lock * 1000)
        break
      case 3:
        lock = new Date(round3Lock * 1000)
        break
      case 4:
        lock = new Date(round4Lock * 1000)
        break
      default:
        lock = new Date()
    }

    let selectedPlayer =  playersRoster.filter(rosterPlayer => rosterPlayer.id == player)[0]
    const { Amateur, first_name, last_name, amateur, newStatus} = selectedPlayer

    return (
      <Row className={`border rounded my-1 py-1${round > 2 && (newStatus === 'C' || newStatus === 'W' ) ? ' border-danger' : ''}`}>
        <Col xs={3}>
          {player ? <Image src={picture} className=' mx-auto border rounded-circle lineup-img' /> : null}
        </Col>
        <Col xs={9} md={6} className='my-auto'>
          {new Date() > lock || currentRound > round  || (currentRound === round && round_active !== 'P' ) ? <h6 className='fs-5'>{first_name} {last_name}{amateur || Amateur ? ' (A)' : '' }</h6> : <SelectionDropdown playersRoster={playersRoster} setRoundLineup={setRoundLineup} selectedPlayer={selectedPlayer} roundLineup={roundLineup} round={round} lineupSpot={lineupSpot} lock={lock} setShowLock={setShowLock} />}
        </Col >
      <Alert key='danger' variant='danger' dismissible onClose={() => setShowLock(false)} show={showLock}>
      Change unsuccessful - Round Locked
    </Alert>
      </Row>
    )
  }
}

export default LineupSelection