import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


const Footer = () => {
  return (
    <Container fluid className='text-white bg-success p-1 text-center'>
      <h6>Master's Fantasy Golf</h6>
      <Row>
        <Col>
          <a href='https://www.masters.com' target='_blank' className='text-white'>Complete coverage</a>
        </Col>
        <Col>
          <a href='https://docs.google.com/forms/d/1uQV9O5uHvIFPDLIiv-nTHkvaat4kdOin-ikKIneNxII/' target='_blank' className='text-white'>Report an incident</a>
        </Col>
      </Row>
      <p className='label-small mb-0 mt-2'>This application has no affliation with the Master's Golf Tournamnet</p>
    </Container>
  )
}

export default Footer