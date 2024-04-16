import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Image from 'react-bootstrap/Image';
import Container from 'react-bootstrap/esm/Container';


// const PlayerPageHeader = ({ first_name, last_name, amateur, countryCode, position, total, today, playing, teeTime }) => {
const PlayerPageHeader = ({ bio, scores }) => {
  console.log(bio, scores)
  const { player } = bio
  const { first_name, last_name, amateur, countryCode } = player

  const showScores = () => {
    const { score } = scores
    const { playing, position, today, total } = score
  
    const pos = () => {
      if (playing === 'MC') return 'MC'
      else if (playing === 'WD') return 'WD'
      else return position
    }
    
    return (
      <Col sm={12} md={5}>
        <Row className='m-1 p-0'>
          <Col className='p-0'>
            <h5 className='text-center m-0'>{pos()}</h5>
            <p className='text-center m-0 label-small'>Position</p>
          </Col>
          <Col className='p-0'>
            <h5 className={`text-center m-0 ${Number(total) < 0 ? 'text-danger' : total === 'E' ?  'text-success' : null}`}>{total}</h5>
            <p className='text-center m-0 label-small'>Total</p>
          </Col>
          <Col className={`${!today ? 'hidden' : null} p-0`}>
            <h5 className={`text-center m-0 ${Number(today) < 0 ? 'text-danger' : today === 'E' ?  'text-success' : null}`}>{today}</h5>
            <p className='text-center m-0 label-small'>Today</p>              
          </Col> 
          <Col className={`${playing === 'MC' || playing === 'WD' ? 'hidden' : null} p-0`}>
            {/* <h5 className='text-center m-0'>{Number(playing) > 0 || playing.substring(0) == 'F'  ? playing : playing}</h5> */}
            <h5 className='text-center m-0'>{playing}</h5>
            <p className='text-center m-0 label-small'>{Number(playing) > 0 || playing.substring(0) == 'F'  ? 'Thru' : 'Tee Time'}</p>
          </Col>
        </Row>
      </Col>
    )    
  }

  return (
    <Container fluid className='m-1 p-0'>
      {window.innerWidth > 775 ? null : (
        <Row className='text-end label-small m-0'>
          <a className='text-muted label-small' href='/tournament/players'>{'< Invitees'}</a>
        </Row>
      )}
      <Row className='m-0 p-0'>
        <Col sm={12} md={5} className='my-auto'>
          <h3>
            {first_name} {last_name}{amateur  ? ' (A)' : null} <Image src={`https://www.masters.com/assets/images/flags/${countryCode}_sm.gif`} alt={`${countryCode}-flag`} />
          </h3>
        </Col>
        {scores ? showScores() : null}
        {window.innerWidth > 775 ? (
          <Col md={2} className='text-end p-0 my-auto' >
            <a className='fs-6 text-muted' href='/tournament/players'>{'< Invitees'}</a>
          </Col>
        ) : null}
      </Row>
    </Container>
  )
}

export default PlayerPageHeader