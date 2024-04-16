import { useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Image from 'react-bootstrap/Image';

import { EventConfig } from '../../../Contexts/EventConfig';
import { TournamentLeaderboardContext } from '../../../Contexts/TournamentLeaderboard';
import { PlayersContext } from '../../../Contexts/PlayersContext';
import PlayerPageHeader from './PlayerPageHeader';
import PlayerPageScorecard from './PlayerPageScorecard';
import PlayerStatsComponent from './PlayerStatsComponent';
import PlayerBio from './PlayerBio';
import PlayerHistory from './PlayerHistory';

const PlayerPage = () => {
  const { playerId } = useParams()
  const { eventConfig, setEventConfig } = useContext(EventConfig)
  const { playersContext, setPlayersContext } = useContext(PlayersContext)
  const { tournamentLeaderboardContext, setTournamentLeaderboardContext } = useContext(TournamentLeaderboardContext)
  const [ playerData, setPlayerData ] = useState(null)
  const [ playerStat, setPlayerStat ] = useState(null)

  useEffect(() => {
    const fetchData = async (url, state) => {
      try {
        const response = await fetch(url)
        const data = await response.json()
        if (state === 'playerData') setPlayerData(data)
        else if (state === 'playerStat') setPlayerStat(data)
      } catch (error) {
        console.error(error)
        if (state === 'playerData') setPlayerData({data: 'None'})
        else if (state === 'playerStat') setPlayerStat({data: 'None'})
      }
    }

    if (eventConfig) {
      const { scoringData, cmsData } = eventConfig
      let  { playerStats } = scoringData
      let { playerProfile }  = cmsData
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
    // no playerData no page
    if (!bio) {
      return (
        <Container fluid>
          <h3>
            Profile not avalible for this player
          </h3>
        </Container>
      )
    }

    const { player } = bio
    const { first_name, last_name, photo_url } = player
    const { meduim, large } = photo_url[photo_url.length - 1]
    
    // playerStat var destructure
    const { scores, stats } = playerStat

    // // tournamentLeaderboardContext var destructure
    const { leaderboard } = tournamentLeaderboardContext

    return (
      <Container fluid>
        <PlayerPageHeader bio={bio} scores={scores} />
        <Row >
          <Image src={large || meduim} alt={playerId} />
          <hr className='my-2' />
        </Row>
        <Row>
          <PlayerPageScorecard leaderboard={leaderboard} playerId={playerId} />
          {leaderboard ? <hr className='my-2' /> : null}
        </Row>
        <Row>
          <PlayerStatsComponent stats={stats}/>
          {stats ? <hr className='my-2' /> : null}
        </Row>
        <Row>
          <PlayerHistory bio={bio} />
          <hr className='my-2' />
        </Row>
        <Row>
          <PlayerBio bio={bio} />
          <hr className='my-2' />
        </Row>
        <Row>
          <a href={`https://www.masters.com/en_US/players/player_${playerId}.html`} target='_blank' className='text-center text-success'>
            For a complete profile for {first_name} {last_name} please visit masters.com
          </a>
        </Row>
      </Container>
    )
  }
} 

export default PlayerPage