import { useContext, useState } from 'react'
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Accordion from 'react-bootstrap/Accordion';

import { TournamentLeaderboardContext } from '../../Contexts/TournamentLeaderboard'
import { PlayersContext } from '../../Contexts/PlayersContext'
import { UserRoster } from '../../Contexts/UserRosterContext'
import FantasyRosterSpots from '../../assets/Files/FantasyRosterSpots'
import RosterSpot from './RosterSpot';

const UserRosterSelection = ({ lineups, round, golfers }) => {
  const {playersContext, setPlayersContext} = useContext(PlayersContext)
  const {tournamentLeaderboardContext, setTournamentLeaderboardContext} = useContext(TournamentLeaderboardContext)
  const {userRoster, setUserRoster}= useContext(UserRoster)

  if (tournamentLeaderboardContext && playersContext && userRoster) {
    const{ roster } = userRoster
    const { past_champ, usa, intl, wild_card1, wild_card2, wild_card3 } = roster

    let playerList

    // if (tournamentLeaderboardContext.leaderboard) {
    //   const { leaderboard } = tournamentLeaderboardContext
    //   const { player } = leaderboard
      
    //   playerList = player
    // } else 
    if (playersContext) {
      const { players } = playersContext
      playerList = players
    }
    
    const rosterCards = FantasyRosterSpots.map((spot, i) => {

      let golfer
      let cardName

      const showGolfer = (key, card) => {
        golfer = {
          player: playerList.filter(invitee => invitee.id == roster[key])[0],
          stats: golfers.filter(golfer => golfer.golfer_id ==roster[key])[0]
        }
        cardName = card
      }

      const showDefalt = (card) => {
        golfer = null
        cardName = card
      }

      switch (spot) {
        case 'Past':
          if (past_champ) showGolfer('past_champ', 'Past Champion')
          else showDefalt('Past Champion')
          break
        case 'USA':
          if (usa) showGolfer('usa', 'USA')
          else showDefalt('USA')
          break
        case 'Intl':
          if (intl) showGolfer('intl', 'International')
          else showDefalt('International')
          break
        case 'WC1':
          if (wild_card1) showGolfer('wild_card1', 'Wild Card')
          else showDefalt('Wild Card')
          break
        case 'WC2':
          if (wild_card2) showGolfer('wild_card2', 'Wild Card')
          else showDefalt('Wild Card')
          break
        case 'WC3':
          if (wild_card3) showGolfer('wild_card3', 'Wild Card')
          else showDefalt('Wild Card')
          break      
      }

      return (
        <Col key={`roster-spot-${spot}-${golfer ? golfer.id : 'default'}`} xs={12} sm={12} md={6} xl={4} xxl={4}>
          <RosterSpot golfer={golfer} cardName={cardName} i={i} round={round} lineups={lineups} />
        </Col>
      )
    })
  
    return (
      <Accordion flush>
        <Accordion.Item eventKey="0">
          <Accordion.Header>
            <h4 className='text-center'>Roster</h4>
          </Accordion.Header>
          <Accordion.Body className='p-1'>
            <Row>
            {rosterCards}
            </Row>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    )
  }
}

export default UserRosterSelection