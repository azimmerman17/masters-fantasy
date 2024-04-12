import { useContext, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';
import { IoGolf } from 'react-icons/io5'

import { EventConfig } from '../../Contexts/EventConfig'
import PlayerOffcanvas from './PlayerOffcanvas';
import RosterPlayerStats from './RosterPlayerStats';

const RosterSpot = ({ player, cardName, lock, i }) => {
  const { eventConfig, setEventConfig } = useContext(EventConfig)
  const [show, setShow] = useState(false)
  
  if (eventConfig) {
    const { dataSettings } = eventConfig
    const { tournamentYear } = dataSettings

    const handleClick = () => {
      setShow(true)
    }
    
    let picture
    if (player) picture = `https://images.masters.com/players/${tournamentYear}/240x240/${player.id}.jpg`

    const lockSelectInfo = () => {
      if (player) {
        console.log(player)
        return (
          <>
            {lock ? <RosterPlayerStats newStatus={player.newStatus} pos={player.pos} topar={player.topar} teetime={player.teetime} status={player.status} thru={player.thru} /> : <Button variant='primary' onClick={handleClick}>Select Player</Button>}
          </>
        )
      } else {
        return (
          <>
            {lock ? null : <Button variant='primary' onClick={handleClick}>Select Player</Button>}
          </>
        )
      }
    }

    return (
      <Card className={`m-1 p-1 text-center${player ? player.newStatus === 'C' || player.newStatus === 'W' ? ' border-danger' : ' border-success shadow-lg' : ''}`}>
        {player ? <Image src={picture} className=' mx-auto border rounded-circle roster-img' /> : null}
        <Card.Body className='text-center'>
          {player ? <Card.Title>{player.first_name} {player.last_name} {player.amateur ? '(A)' : null}</Card.Title> : <IoGolf className='bg-success text-white border border-success rounded-circle' style={{height:'75px', width:'75px'}}/>}
          <Card.Text>
            <small>{cardName}</small>
          </Card.Text>
          {lockSelectInfo()}
        </Card.Body>
        <PlayerOffcanvas show={show} cardName={cardName} setShow={setShow} i={i}/>
      </Card>
    )
  }
}

export default RosterSpot