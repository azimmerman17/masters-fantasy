import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import ScoreColor from '../../Functions/ScoreColor';

const RosterPlayerStats  = ({ newStatus, pos, topar, teetime, status }) =>{
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
          </Col>
          <Col>
            <h6 className={`m-0 text-center ${ScoreColor(topar)}`}>{topar}</h6>
            <p className='m-0 text-center label-small'>Score</p>
          </Col>
          <Col>
            <h6 className='m-0 text-center'>{Number(status) > 0 || status === 'F' ? status : teetime}</h6>
            <p className='m-0 text-center label-small'>{Number(status) > 0 || status === 'F' ? 'Thru' : 'Tee Time'}</p>
          </Col>
        </Row>
      )
  }
}

export default RosterPlayerStats