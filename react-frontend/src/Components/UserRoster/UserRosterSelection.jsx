import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Image from 'react-bootstrap/Image';
import Container from 'react-bootstrap/esm/Container';

import FantasyRosterSpots from '../../assets/Files/FantasyRosterSpots'
import RosterSpot from './RosterSpot';

const UserRosterSelection = ({}) => {
  console.log(FantasyRosterSpots)

  const rosterCards = FantasyRosterSpots.map(spot => {
    return (
      <Col key={`roster-spot-${spot}`} xs={6}>
        <RosterSpot player={spot} />
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

export default UserRosterSelection