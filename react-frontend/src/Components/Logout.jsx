import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/esm/Col';
import Container from 'react-bootstrap/esm/Container';
import { useContext, useState } from 'react';

import { CurrentUser } from "../Contexts/CurrentUserContext"

const Logout = () => {
  const { currentUser, setCurrentUser } = useContext(CurrentUser)

  // sets user to null and clears the token
  const handleClick = (e) => {
    setCurrentUser(null)
    localStorage.removeItem('token');
  }

  return (
    <Container fluid>
      <Button variant="warning" className='w-100' style={{maxWidth: '200px'}} onClick={(e) => handleClick(e)}>
        Log out
      </Button>
    </Container>
  )
}

export default Logout