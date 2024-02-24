import { useContext } from "react"
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { EventConfig } from "../../Contexts/EventConfig"
import CheckTeeTime from "../../Functions/CheckTeeTimeLock";
import ScoreColor from "../../Functions/ScoreColor";

const RosterSpot = ({ player, cardName, lock }) => {
  const { eventConfig, setEventConfig } = useContext(EventConfig)
  const { first_name, last_name, id , teetime, pos, status, topar, newStatus } = player
  if (eventConfig) {
    const { dataSettings } = eventConfig
    const { tournamentYear } = dataSettings
  
    const picture = `https://images.masters.com/players/${tournamentYear}/240x240/${id}.jpg`

    const playerStats = () => {
      switch (newStatus) {
        case 'C':
          return <h6 className='m-0 text-center'>MISSED CUT</h6>
        case 'W':
          return <h6 className='m-0 text-center'>WITHDRAWN</h6>
        default:
          return (
            <Row>
              <Col>
                <h6 className='m-0 text-center'>{pos}</h6>
                <p className='m-0 text-center label-small'>Position</p>
              </Col>            <Col>
                <h6 className={`m-0 text-center ${ScoreColor(topar)}`}>{topar}</h6>
                <p className='m-0 text-center label-small'>Score</p>
              </Col>
              <Col>
                <h6 className='m-0 text-center'>{CheckTeeTime(teetime, -5) ? status : teetime}</h6>
                <p className='m-0 text-center label-small'>{CheckTeeTime(teetime, -5) ? 'Thru' : 'Tee Time'}</p>
              </Col>
            </Row>
          )
      }
    }

    return (
      <Card className='m-1 p-1 text-center' >
        <Image src={picture} className=' mx-auto border rounded-circle roster-img' />
        <Card.Body>
          <Card.Title>{first_name} {last_name}</Card.Title>
          <Card.Text>
            <small>{cardName}</small>
          </Card.Text>
         {lock ? playerStats() : <Button variant="primary">Submit</Button>}
        </Card.Body>
      </Card>
    )
  }
}

export default RosterSpot