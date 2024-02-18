import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Col from 'react-bootstrap/Col';
import { FaUserEdit } from "react-icons/fa";

import EditProfileForm from './EditProfileForm';
import EditPasswordForm from './EditPasswordForm';

const EditUserData = ({ currentUser, setCurrentUser }) => {
  let [show, setShow] = useState(false);

  //  opens and closes the offcanvas
  const handleShowClose = () => {
    setShow(!show);
  }

  return (
    <>
      <Button variant="warning" onClick={handleShowClose}>
        <FaUserEdit />
      </Button>{' '}
      <Offcanvas show={show} onHide={handleShowClose} placement='start' scroll backdrop keyboard>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title className='text-center fw-bold'>EDIT PROFILE</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <EditProfileForm currentUser={currentUser}/>
          <hr/>
          <EditPasswordForm currentUser={currentUser}/>
          <Col className='text-end'>
            <Button variant='warning' onClick={handleShowClose}>CANCEL</Button>
          </Col>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  )
}

export default EditUserData