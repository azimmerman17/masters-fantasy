import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/esm/Container';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { CurrentUser } from '../Contexts/CurrentUserContext'

const Logout = () => {
  const { currentUser, setCurrentUser } = useContext(CurrentUser)
  const navigate = useNavigate();

  // sets user to null and clears the token
  const handleClick = (e) => {
    setCurrentUser(null)
    localStorage.removeItem('token');
    navigate('/')
  }

  return (
    <Container fluid>
      <Button variant='warning' className='w-100' style={{maxWidth: '200px'}} onClick={(e) => handleClick(e)}>
        Log out
      </Button>
    </Container>
  )
}

export default Logout