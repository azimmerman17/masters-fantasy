import { useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { FaTrophy } from "react-icons/fa6";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';

import { EventConfig } from '../../../Contexts/EventConfig';
import { PlayersContext } from '../../../Contexts/PlayersContext';
import { TournamentLeaderboardContext } from '../../../Contexts/TournamentLeaderboard';
import PlayerPageHeader from './PlayerPageHeader';
import PlayerPageScorecard from './PlayerPageScorecard';

const PlayerPage = () => {
  const { playerId } = useParams()
  const { eventConfig, setEventConfig } = useContext(EventConfig)
  const { playersContext, setPlayersContext } = useContext(PlayersContext)
  const { tournamentLeaderboardContext, setTournamentLeaderboardContext } = useContext(TournamentLeaderboardContext)
  const [ playerData, setPlayerData ] = useState(null)
  const [ playerStat, setPlayerStat ] = useState(null)

  useEffect(() => {
    const fetchData = async (url, state) => {
      const response = await fetch(url)
      const data = await response.json()
      if (state === 'playerData')setPlayerData(data)
      else if (state === 'playerStat') setPlayerStat(data)
    }

    if (eventConfig) {
      const { scoringData } = eventConfig
      let { playerProfile, playerStats } = scoringData
      let { path } = playerStats
      // replace the id placeholder with the playerId
      playerProfile = playerProfile.replace('<id>', playerId)
      path = path.replace('<playerId>', playerId)
      
      const BaseUrl = 'https://www.masters.com'
      
      if (playerData === null) fetchData(BaseUrl + playerProfile, 'playerData')
      if (playerStat === null) fetchData(BaseUrl + path, 'playerStat')

      let interval = setInterval(() => {
        fetchData() 
      }, 10 * 60 * 1000)  //refresh every 10 minutues

      return () => clearInterval(interval)
    }
  }, [playerData, playerStat, eventConfig, playersContext])



  if (eventConfig && playerData && playerStat && tournamentLeaderboardContext) { //playersContext && 
    // destructure eventConfig to get year
    const { dataSettings, scoringData } = eventConfig
    const { holePars } = scoringData
    const { tournamentYear } = dataSettings

    // playerData var destructure
    const { bio } = playerData
    const { player } = bio
    const { age,  amateur, avgRound, bestFinish, birthplace, countryCode, countryName, cutsMade, first_name, height, highRound, last_name, lowRound, overview, pastMasters, photo_url, swing, tournamentsPlayed, turnedPro, weight, wins } = player
    const { meduim, large } = photo_url[photo_url.length - 1]
    
    // playerStat var destructure
    const { scores, stats } = playerStat
    const { score } = scores
    const { playing, position, today, total } = score

    // tournamentLeaderboardContext var destructure
    const { currentRound, pars, yardages } = tournamentLeaderboardContext
    console.log(currentRound, pars, yardages)
    const golfer = tournamentLeaderboardContext.player.filter(golfer => golfer.id == playerId)[0]


    console.log(playerData,playerStat,golfer, eventConfig)
    

    
  
    
      return (
        <Container fluid className="m-0 p-0">
          <PlayerPageHeader first_name={first_name} last_name={last_name} amateur={amateur} countryCode={countryCode} position={position} total={total} today={today} playing={playing} teeTime={''} />
          <Row >
            <Image src={large || meduim} alt={playerId} />
            <hr className='my-2' />
          </Row>
          <Row>
            <PlayerPageScorecard currentRound={currentRound} pars={pars} yardages={yardages} golfer={golfer} />
            <hr className='my-2' />
          </Row>
          <Row>
            stats
          </Row>
          <Row>
            bio
          </Row>
          <Row>
            history
          </Row>
        </Container>
      )

  }
} 

export default PlayerPage