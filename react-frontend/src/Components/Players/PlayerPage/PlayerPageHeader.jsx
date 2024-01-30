import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Image from 'react-bootstrap/Image';
import Container from 'react-bootstrap/esm/Container';


const PlayerPageHeader = ({ first_name, last_name, amateur, countryCode, position, total, today, playing, teeTime }) => {
console.log(today)
  const pos = () => {
    if (playing === 'MC') return 'MC'
    else if (playing === 'WD') return 'WD'
    else return position
  }

  const thru = () => {
    if (playing === 'MC') return 'MC'
  }

  if (window.innerWidth > 775) {
    return (
      <Row className='m-1'>
        <Col md={5}>
          <h3>
            {first_name} {last_name}{amateur  ? ' (A)' : null} <Image src={`https://www.masters.com/assets/images/flags/${countryCode}_sm.gif`} alt={`${countryCode}-flag`} />
          </h3>
        </Col>
        <Col md={5}>
          <Row>
            <Col>
              <h6 className='text-center m-0'>{pos()}</h6>
              <p className='text-center m-0 label-small'>Position</p>
            </Col>
            <Col>
              <h6 className={`text-center m-0 ${Number(total) < 0 ? 'text-danger' : total === 'E' ?  'text-success' : null}`}>{total}</h6>
              <p className='text-center m-0 label-small'>Total</p>
            </Col>
            <Col className={!today ? 'hidden' : null}>
              <h6 className={`text-center m-0 ${Number(today) < 0 ? 'text-danger' : today === 'E' ?  'text-success' : null}`}>{today}</h6>
              <p className='text-center m-0 label-small'>Today</p>              
            </Col>
            <Col className={playing === 'MC' || playing === 'WD' ? 'hidden' : null}>
              <h6 className='text-center m-0'>{playing}</h6>
              <p className='text-center m-0 label-small'>Tee Time</p>
            </Col>
          </Row>
        </Col>
        <Col md={2} className='text-end' >
          <a className='fs-6 text-muted' href='/tournament/players'>{'< Invitees'}</a>
        </Col>
      </Row>
    )
  } else {
    return (
      <Container fluid>

        <Row>
          <Col xs={12}>
            <h3>
              {first_name} {last_name}{amateur  ? ' (A)' : null} <Image src={`https://www.masters.com/assets/images/flags/${countryCode}_sm.gif`} alt={`${countryCode}-flag`} />
            </h3>
          </Col>
        </Row>
        <Row >
          <Col xs={4}>
            <h6 className='text-center m-0'>{pos()}</h6>
            <p className='text-center m-0 label-small'>Position</p>
          </Col>
          <Col xs={2}>
            <h6 className={`text-center m-0 ${Number(total) < 0 ? 'text-danger' : total === 'E' ?  'text-success' : null}`}>{total}</h6>
            <p className='text-center m-0 label-small'>Total</p>
          </Col>
          <Col xs={2} className={!today ? 'hidden' : null}>
            <h6 className={`text-center m-0 ${Number(today) < 0 ? 'text-danger' : today === 'E' ?  'text-success' : null}`}>{today}</h6>
            <p className='text-center m-0 label-small'>Today</p>              
          </Col>
          <Col xs={4} className={playing === 'MC' || playing === 'WD' ? 'hidden' : null}>
            <h6 className='text-center m-0'>{playing}</h6>
            <p className='text-center m-0 label-small'>Tee Time</p>
          </Col>
        </Row>
      </Container>
    )
  }
}

export default PlayerPageHeader