import { useContext, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';
import { IoGolf } from 'react-icons/io5'

import { FantasyTournamentConfig } from '../../Contexts/FantasyTournamentConfig'
import PlayerOffcanvas from './PlayerOffcanvas';
import RosterPlayerStats from './RosterPlayerStats';

const RosterSpot = ({ golfer, cardName, i, round, lineups }) => {
  const { fantasyTournamentConfig, setFantasyTournamentConfig } = useContext(FantasyTournamentConfig)
  const [show, setShow] = useState(false)
  
  if (fantasyTournamentConfig) {
    const { tourny_active, year, currentRound, round_active} = fantasyTournamentConfig

    // const { player, stats } = golfer
    //     const {  } = player
    //     const { golfer_id, pos, rnd1, rnd1_sf, rnd1_tt, rnd2, rnd2_sf, rnd2_tt, rnd3, rnd3_sf, rnd3_tt, rnd4, rnd4_sf, rnd4_tt, status, thru } = stats

    const handleClick = (tourny_active) => {
      if (tourny_active === 'P') setShow(!show) // change to !locked for production
    }
    
    let picture = () => {
      if (!golfer) return null
      const { player } = golfer
      const { id } = player

      return `https://images.masters.com/players/${year}/240x240/${id}.jpg`
    }
    
    const lockSelectInfo = () => {
      if (golfer && tourny_active !== 'P') {
        const { player, stats } = golfer
        const { pos, rnd1, rnd1_sf, rnd1_tt, rnd2, rnd2_sf, rnd2_tt, rnd3, rnd3_sf, rnd3_tt, rnd4, rnd4_sf, rnd4_tt, status, thru } = stats
    

        const total = rnd1 + rnd2 + rnd3 + rnd4
        const sf_total = rnd1_sf + rnd2_sf + rnd3_sf + rnd4_sf
        let showRnd = currentRound 
        if  (round_active === 'P') showRnd -=1
          
        let today
        let today_sf
        let teetime

        switch (showRnd) {
          case 1:
            today = rnd1
            today_sf = rnd1_sf
            teetime = rnd1_tt
            break
          case 2:
            today = rnd2
            today_sf = rnd2_sf
            teetime = rnd2_tt
            break
          case 3:
            today = rnd3
            today_sf = rnd3_sf
            teetime = rnd3_tt
            break
          case 4:
            today = rnd4
            today_sf = rnd4_sf
            teetime = rnd4_tt
            break
          default:
            today = rnd1
            today_sf = rnd1_sf
            teetime = rnd1_tt
            break
        }

        return (
          <>
            {tourny_active !== 'P' ? <RosterPlayerStats newStatus={status} pos={pos} topar={total} teetime={teetime} status={status} thru={thru} sf_total={sf_total} today={today} today_sf={today_sf} round_active={round_active} /> : <p className='text-center m-0 p-1 '> Click to Select New Player</p>}
          </>
        )
      } else {
        return (
          <>
            {tourny_active !== 'P' ? null : <p className='text-center m-0 p-1 '>Click to Select Player</p>}
          </>
        )
      }
    }

    const setBorderColor = (golfer) => {
      if (!golfer) return 'success'
      const { player } = golfer
      const { id, status } = player

      const checkLineup = (id) => {
        let currentLineup = lineups.filter(lineup => lineup.round === round)[0]
        const lineup = [currentLineup.player1, currentLineup.player2, currentLineup.player3]

        if (lineup.includes(Number(id))) {
          return 'primary'
        }
        else return 'success'
      }

      if (id) {
        if (status === 'C' || status === 'W') return 'danger'  // player no longer in event
        else if (round) return checkLineup(id)
        else return 'success'
      } else return 'secondary'
    }

    return (
      <Button onClick={e => handleClick(tourny_active)} variant={setBorderColor(golfer)} className={`w-100 m-1 p-1 text-center${golfer && (status !== 'C' || status !== 'W') ? ' shadow-lg' : ''}`} disabled={status === 'C' || status === 'W' ? true : false}>
        <Card className='m-1 p-1 text-center'>
          {golfer ? <Image src={picture()} className=' mx-auto border rounded-circle roster-img' /> : null}
          <Card.Body className='text-center pb-0'>
            {golfer ? <Card.Title className='fw-bold'>{golfer.player.first_name} {golfer.player.last_name} {golfer.player.amateur ? '(A)' : null}</Card.Title> : <IoGolf className='bg-success text-white border border-success rounded-circle' style={{height:'75px', width:'75px'}}/>}
            {lockSelectInfo()}
            <Card.Text className='pt-1'>
              <small className='fw-bold mb-0'>{cardName}</small>
            </Card.Text>
          </Card.Body>
          <PlayerOffcanvas show={show} cardName={cardName} setShow={setShow} i={i} />
        </Card>
      </Button>
    )
  }  
}

export default RosterSpot