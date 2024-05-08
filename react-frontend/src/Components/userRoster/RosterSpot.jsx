import { useContext, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';
import { IoGolf } from 'react-icons/io5'

import { EventConfig } from '../../Contexts/EventConfig'
import PlayerOffcanvas from './PlayerOffcanvas';
import RosterPlayerStats from './RosterPlayerStats';

const RosterSpot = ({ player, cardName, lock, i, round, lineups }) => {
  console.log(round)
  const { eventConfig, setEventConfig } = useContext(EventConfig)
  const [show, setShow] = useState(false)
  
  if (eventConfig) {
    const { dataSettings } = eventConfig
    const { tournamentYear } = dataSettings

    const handleClick = (locked) => {
      if (locked) setShow(true) // change to !locked for production
    }
    
    let picture
    if (player) picture = `https://images.masters.com/players/${tournamentYear}/240x240/${player.id}.jpg`

    const lockSelectInfo = () => {
      if (player) {
        return (
          <>
            {!lock ? <RosterPlayerStats newStatus={player.newStatus} pos={player.pos} topar={player.topar} teetime={player.teetime} status={player.status} thru={player.thru} /> : <p className='text-center m-0 p-1 '> Click to Select New Player</p>}
          </>
        )
      } else {
        return (
          <>
            {!lock ? null : <p className='text-center m-0 p-1 '>Click to Select Player</p>}
          </>
        )
      }
    }

    const setBorderColor = (player, newStatus) => {
      const checkLineup = (player) => {
        let currentLineup = lineups.filter(lineup => lineup.round === round)[0]
        const lineup = [currentLineup.player1, currentLineup.player2, currentLineup.player3]

        if (lineup.includes(Number(player))) {
          return 'primary'
        }
        else return 'success'
      }

      if (player) {
        if (newStatus === 'C' || newStatus === 'W') return 'danger'  // player no longer in event
        else if (round) return checkLineup(player)
        else return 'success'
      } else return 'secondary'
    }

    return (
      <Button onClick={e => handleClick(lock)} variant={setBorderColor(player.id, player.newStatus)} className={`w-100 m-1 p-1 text-center${player && (player.newStatus !== 'C' || player.newStatus !== 'W') ? ' shadow-lg' : ''}`} disabled={player.newStatus === 'C' || player.newStatus === 'W' ? true : false}>
        <Card className='m-1 p-1 text-center'>
          {player ? <Image src={picture} className=' mx-auto border rounded-circle roster-img' /> : null}
          <Card.Body className='text-center'>
            {player ? <Card.Title>{player.first_name} {player.last_name} {player.amateur ? '(A)' : null}</Card.Title> : <IoGolf className='bg-success text-white border border-success rounded-circle' style={{height:'75px', width:'75px'}}/>}
            <Card.Text>
              <small className='fw-bold'>{cardName}</small>
            </Card.Text>
            {lockSelectInfo()}
          </Card.Body>
          <PlayerOffcanvas show={show} cardName={cardName} setShow={setShow} i={i}/>
        </Card>
      </Button>
    )
  }
}

export default RosterSpot