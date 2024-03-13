import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Footer = () => {
  return (
    <Navbar fixed='bottom' bg='success' variant='success'>
      <Container fluid className='text-white'>
        <Row>
          <Col xs={12}>
            <Navbar.Brand className='text-white' href='/'><h6>Master's Fantasy Golf</h6></Navbar.Brand>
          </Col>
        </Row>
        <p>This application has no affliation with the Master's Golf Tournamnet</p>
        <a href='www.masters.com' target='_blank' className='text-white'>Complete coverage of the event</a>

      </Container>
    </Navbar>
  )
}

export default Footer