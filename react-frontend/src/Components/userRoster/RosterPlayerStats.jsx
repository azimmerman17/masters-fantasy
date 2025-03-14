import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import ScoreColor from '../../Functions/ScoreColor';

const RosterPlayerStats  = ({ newStatus, pos, topar, teetime, status, thru, today, today_sf, sf_total, round_active }) =>{
  if (topar > 0) topar = `+${topar}`
  else if (topar == 0) topar = 'E'

  if (today > 0) today = `+${today}`
  else if (today == 0) today = 'E'

  switch (newStatus) {
    case 'C':
      return <h6 className='m-0 text-center'>MISSED CUT</h6>
    case 'W':
      return <h6 className='m-0 text-center'>WITHDRAWN</h6>
    default:
      return (
        <>
          <Row>
            <Col>
              <h6 className={`m-0 text-center ${ScoreColor(topar)}`}>{topar}</h6>
              <p className='m-0 text-center label-small'>Score</p>
            </Col>    
            <Col>
              <h6 className={`m-0 text-center ${ScoreColor(sf_total)}`}>{sf_total}</h6>
              <p className='m-0 text-center label-small'>Stableford</p>
            </Col>
            <Col>
              <h6 className='m-0 text-center'>{pos}</h6>
              <p className='m-0 text-center label-small'>Position</p>
            </Col>
          </Row>
          <Row>
            <Col>
              <h6 className={`m-0 text-center ${ScoreColor(today)}`}>{today}</h6>
              <p className='m-0 text-center label-small'>{round_active === 'P' ? 'Last' : 'Today'}</p>
            </Col>
            <Col>
              <h6 className={`m-0 text-center ${ScoreColor(today_sf)}`}>{today_sf}</h6>
              <p className='m-0 text-center label-small'>SF {round_active === 'P' ? 'Last' : 'Today'}</p>
            </Col>
            <Col>
              <h6 className='m-0 text-center'>{Number(thru) > 0 || status === 'F' || status === 'A' ? thru : teetime}</h6>
              <p className='m-0 text-center label-small'>{Number(thru) > 0 || status === 'F' || status === 'A' ? 'Thru' : 'Tee Time'}</p>
            </Col>
          </Row>
        </>
      )
  }
}

export default RosterPlayerStats