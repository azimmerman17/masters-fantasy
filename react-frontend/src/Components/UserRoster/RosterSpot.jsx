import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

const RosterSpot = ({ player }) => {
  const picture = `https://www.masters.com/assets/images/login/avatars/hole${Math.ceil(Math.random() *18)}.svg`

  return (
    <Card className='m-1 p-1'>
      <Card.Img variant="top" src={picture} />
      <Card.Body>
        <Card.Title>{player}</Card.Title>
        <Card.Text>
          {player}
        </Card.Text>
        <Button variant="primary">Submit</Button>
      </Card.Body>
    </Card>
  )
}

export default RosterSpot