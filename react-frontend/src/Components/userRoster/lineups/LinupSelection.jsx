import { useContext, useState } from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/Image'
import Alert from 'react-bootstrap/esm/Alert';

import { FantasyTournamentConfig } from '../../../Contexts/FantasyTournamentConfig'

import SelectionDropdown from './SelectionDropDown'
import ScoreColor from '../../../Functions/ScoreColor';
import FormatTime from '../../../Functions/FormatTime';



const LineupSelection =({ playerRoster, id, roundLineup, setRoundLineup, round, spot }) => {
  const {fantasyTournamentConfig, setFantasyTournamentConfig} = useContext(FantasyTournamentConfig)
  let [showLock, setShowLock] = useState(false) 

  if ( fantasyTournamentConfig) {
    const { year, round1Lock, round2Lock, round3Lock, round4Lock, currentRound, round_active } = fantasyTournamentConfig 
    let selectedPlayer =  playerRoster.filter(rosterPlayer => rosterPlayer.player.id == id)[0]
    const { stats, player } = selectedPlayer
    
    const { Amateur, first_name, last_name} = player

    let picture = `https://images.masters.com/players/${year}/240x240/${id}.jpg`
    let lock 


    const getStats = (stats, curRound) => {
      if (stats) {
        const { status, rnd1, rnd1_tt, rnd2, rnd2_tt, rnd3, rnd3_tt, rnd4, rnd4_tt, thru } = stats
        let teeTime 
        let score  
        let holesThru = null
        let prevTotal = null
    
        switch (round) {
          case 1:
            lock = new Date(round1Lock * 1000)
            teeTime = rnd1_tt
            score = rnd1
            if (round < curRound) holesThru = 'F'
            else if (round == curRound) holesThru = thru
            break
          case 2:
            lock = new Date(round2Lock * 1000)
            teeTime = rnd2_tt
            score = rnd2
            if (round < curRound) holesThru = 'F'
            else if (round == curRound) holesThru = thru
            prevTotal = rnd1
            break
          case 3:
            lock = new Date(round3Lock * 1000)
            teeTime = rnd3_tt
            score = rnd3
            if (round < curRound) holesThru = 'F'
            else if (round == curRound) holesThru = thru
            prevTotal = rnd3
            break
          case 4:
            lock = new Date(round4Lock * 1000)
            teeTime = rnd4_tt
            score = rnd4
            if (round < curRound) holesThru = 'F'
            else if (round == curRound) holesThru = thru
            prevTotal = rnd3
            break
          default:
            lock = new Date()
        }

        if (score > 0) score = `+${score}`
        if (score == 0) score = 'E'

        if (round > curRound || round == curRound &&  new Date() <= new Date(teeTime * 1000)) {
          return (
            <Row>
              <Col>
                <h6 className={`m-0 text-center ${ScoreColor(prevTotal)}`}>{round !== 1 ? prevTotal : ''}</h6>
                <p className='m-0 text-center label-small'>{round !== 1 ? 'Last' : ''}</p>
              </Col>
              <Col>
                <h6 className='m-0 text-center'>{FormatTime(new Date(teeTime *1000))}</h6>
                <p className='m-0 text-center label-small'>Tee Time</p>
              </Col>
            </Row>
          )
        } else {
          return (
            <Row>
              <Col>
                <h6 className={`m-0 text-center ${ScoreColor(score)}`}>{score}</h6>
                <p className='m-0 text-center label-small'>Today</p>
              </Col>
              <Col>
                <h6 className='m-0 text-center'>{thru}</h6>
                <p className='m-0 text-center label-small'>Thru</p>
              </Col>
            </Row>
          )
        }
      }
    }

    return (
      <Row className={`border rounded my-1 py-1${round > 2 && (status === 'C' || status === 'W' ) ? ' border-danger' : ''}`}>
        <Col xs={3}>
          {player ? <Image src={picture} className=' mx-auto border rounded-circle lineup-img' /> : null}
        </Col>
        <Col xs={9} md={6} className='my-auto'>
          <Row>
            {new Date() < lock || currentRound > round  || (currentRound === round && round_active !== 'P' ) ? <h6 className='fs-5 text-center'>{first_name} {last_name}{Amateur ? ' (A)' : '' }</h6> : <SelectionDropdown playerRoster={playerRoster} setRoundLineup={setRoundLineup} selectedPlayer={selectedPlayer} roundLineup={roundLineup} round={round} spot={spot} lock={lock} setShowLock={setShowLock} />}
          </Row>
            {getStats(stats, currentRound)}
        </Col >
      <Alert key='danger' variant='danger' dismissible onClose={() => setShowLock(false)} show={showLock}>
      Change unsuccessful - Round Locked
    </Alert>
      </Row>
    )
  }
}

export default LineupSelection