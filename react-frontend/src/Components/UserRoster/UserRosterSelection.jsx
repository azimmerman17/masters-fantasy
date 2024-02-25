import { useContext } from "react"
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Image from 'react-bootstrap/Image';
import Container from 'react-bootstrap/esm/Container';

import { TournamentLeaderboardContext } from "../../Contexts/TournamentLeaderboard"
import FantasyRosterSpots from '../../assets/Files/FantasyRosterSpots'
import RosterSpot from './RosterSpot';

const UserRosterSelection = ({ roster, locked }) => {
  const { tournamentLeaderboardContext, setTournamentLeaderboardContext} = useContext(TournamentLeaderboardContext)
  const { past_champ, usa, intl, wild_card1, wild_card2, wild_card3 } = roster


  if (tournamentLeaderboardContext) {
     const { leaderboard } = tournamentLeaderboardContext
  
    const rosterCards = FantasyRosterSpots.map((spot, i) => {
      const { player } = leaderboard

      let golfer
      let cardName
      switch (spot) {
        case 'Past':
          golfer = player.filter(invitee => invitee.id == past_champ)[0]
          cardName = 'Past Champion'
          break
        case 'USA':
          golfer = player.filter(invitee => invitee.id == usa)[0]
          cardName = 'USA'
          break
        case 'Intl':
          golfer = player.filter(invitee => invitee.id == intl)[0]
          cardName = 'International'
          break
        case 'WC1':
          golfer = player.filter(invitee => invitee.id == wild_card1)[0]
          cardName = 'Wild Card'
          break
        case 'WC2':
          golfer = player.filter(invitee => invitee.id == wild_card2)[0]
          cardName = 'Wild Card'

          break
        case 'WC3':
          golfer = player.filter(invitee => invitee.id == wild_card3)[0]
          cardName = 'Wild Card'
          break      
      }
            return (
        <Col key={`roster-spot-${spot}-${golfer.id}`} xs={12} sm={12} md={6} xl={4} xxl={2}>
          <RosterSpot player={golfer} cardName={cardName} lock={locked} i={i}/>
        </Col>
      )
    })
  
    return (
      <Container fluid>
        <Row>
          {rosterCards}
        </Row>
      </Container>
    )

  }
}

export default UserRosterSelection