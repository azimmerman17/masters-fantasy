import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Footer = () => {
  return (
    // <Navbar fixed='bottom' bg='success' variant='success'>
      <Container fluid className='text-white bg-success p-1 text-center'>
        <h6>Master's Fantasy Golf</h6>
        <a href='https://www.masters.com' target='_blank' className='text-white'>Complete coverage of the event</a>
        <p className='label-small mb-0 mt-2'>This application has no affliation with the Master's Golf Tournamnet</p>

      </Container>
    // </Navbar>
  )
}

export default Footer