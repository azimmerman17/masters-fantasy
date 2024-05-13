import Container from 'react-bootstrap/Container'
import Spinner from 'react-bootstrap/Spinner';

import { IoGolf } from 'react-icons/io5'

const Loading = () => {
  return (
    <Container fluidx>
      {/* <h1>
        <IoGolf className='loading bg-success text-white border border-success rounded-circle' style={{height:'75px', width:'75px'}}/>
      </h1> */}
      <h1 className='text-center'>
        <Spinner animation='grow' variant='success' size='xl' className='mx-2'/>
         Loading...

      </h1>
    </Container>
  )
}

export default Loading