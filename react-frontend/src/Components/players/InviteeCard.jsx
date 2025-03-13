import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import Card from 'react-bootstrap/Card';
import { FaTrophy } from 'react-icons/fa6';


const InviteeCard = ({ player, year }) => {
  const { name, id, countryCode, past_champion, amateur, first_masters, masters_wins } = player

  let winsArr = []
  if (past_champion) {
    for (let i = 0; i < masters_wins; i++) winsArr.push(i)
  }

  const trophies = winsArr.map(win => {
    return <span className='fw-bold text-warning m-0' key={`${id}-win-${win}`}><FaTrophy /></span>
  })
  
  return (
    <Col xs={12} md={6} lg={4} xl={3}>
      <Button className='p-0 m-2' variant='success' href={`/tournament/players/${id}`}>
        <Card className='bg-success'>
          <Card.Img variant='top' src={`https://images.masters.com/players/${year}/720x405/${id}.jpg`} alt={id} />
          <Card.Body>
            <Card.Title className='text-white fw-bold'>{name}{amateur ? ' (A)' : null}</Card.Title>
            <Card.Text>
              <Row>
                <Col>
                  {past_champion ? <div className='m-0'>{trophies}</div> : null}
                </Col>
                <Col>
                  <Image src={`https://www.masters.com/assets/images/flags/${countryCode}_sm.gif`} alt={countryCode} />
                </Col>
                <Col>
                  {first_masters ? <p className='fw-bold text-white m-0'>1st</p> : null}
                </Col>
              </Row>
            </Card.Text>
          </Card.Body>
        </Card>
      </Button>
    </Col>
  )
}

export default InviteeCard
