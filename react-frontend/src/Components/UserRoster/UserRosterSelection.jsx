import { useContext } from "react"
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
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

      const showGolfer = (key, card) => {
        golfer = player.filter(invitee => invitee.id == roster[key])[0]
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
        <Col key={`roster-spot-${spot}-${golfer ? golfer.id : 'default'}`} xs={12} sm={12} md={6} xl={4} xxl={2}>
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