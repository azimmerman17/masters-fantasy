import { useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Image from 'react-bootstrap/Image';

import { EventConfig } from '../../../Contexts/EventConfig';
import { TournamentLeaderboardContext } from '../../../Contexts/TournamentLeaderboard';
import PlayerPageHeader from './PlayerPageHeader';
import PlayerPageScorecard from './PlayerPageScorecard';
import PlayerStatsComponent from './PlayerStatsComponent';
import PlayerBio from './PlayerBio';
import PlayerHistory from './PlayerHistory';

const PlayerPage = () => {
  const { playerId } = useParams()
  const { eventConfig, setEventConfig } = useContext(EventConfig)
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
  }, [playerData, playerStat, eventConfig])

  if (eventConfig && playerData && playerStat && tournamentLeaderboardContext) { 

    // playerData var destructure
    const { bio } = playerData

    const { player } = bio
    const { age, avgRound, bestFinish, countryCode, countryName, cutsMade, first_name, height, highRound, last_name, lowRound, overview, pastMasters, photo_url, swing, tournamentsPlayed, turnedPro, weight, wins, roundsUnderPar, roundsPlayed } = player
    const { meduim, large } = photo_url[photo_url.length - 1]
    
    // playerStat var destructure
    const { scores, stats } = playerStat
    const { score } = scores
    const { playing, position, today, total } = score

    // tournamentLeaderboardContext var destructure
    const { leaderboard } = tournamentLeaderboardContext
    const { pars, yardages } = leaderboard
    const golfer = leaderboard.player.filter(golfer => golfer.id == playerId)[0]
    const { amateur, firsttimer } = golfer

    return (
      <Container fluid>
        <PlayerPageHeader first_name={first_name} last_name={last_name} amateur={amateur} countryCode={countryCode} position={position} total={total} today={today} playing={playing} teeTime={''} />
        <Row >
          <Image src={large || meduim} alt={playerId} />
          <hr className='my-2' />
        </Row>
        <Row>
          <PlayerPageScorecard pars={pars} yardages={yardages} golfer={golfer} />
          <hr className='my-2' />
        </Row>
        <Row>
          <PlayerStatsComponent stats={stats}/>
          <hr className='my-2' />
        </Row>
        <Row>
          <PlayerHistory avgRound={avgRound} bestFinish={bestFinish} cutsMade={cutsMade} highRound={highRound} lowRound={lowRound} firsttimer={firsttimer} tournamentsPlayed={tournamentsPlayed} roundsPlayed={roundsPlayed}  roundsUnderPar={roundsUnderPar} pastMasters={pastMasters} first_name={first_name} last_name={last_name} />
          <hr className='my-2' />
        </Row>
        <Row>
          <PlayerBio age={age} amateur={amateur} countryCode={countryCode} countryName={countryName} height={height} overview={overview} swing={swing} turnedPro={turnedPro} weight={weight} wins={wins} first_name={first_name} last_name={last_name} />
          <hr className='my-2' />
        </Row>
      </Container>
    )
  }
} 

export default PlayerPage