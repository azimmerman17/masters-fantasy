import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Form from 'react-bootstrap/Form';

import { FaRegTrashCan } from 'react-icons/fa6';

const DeleteAlert = ({ id }) => {
  const BASE_URL = import.meta.env.VITE_BASE_URL
  const navigate = useNavigate();
  let [show, setShow] = useState(false);
  let [disable, setDisable] =useState(true)

  // function to open and close offcanvas
  const handleShowClose = () => {
    setDisable(true)
    setShow(!show);
  }

  // enable/disable sumbit button with the checkbox
  const handleClick = () => {
    setDisable(!disable)
  }

  // function to delete the account
  const handleSumbit = async (e) => {
    e.preventDefault()

    const options = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'mode': 'no-cors',
      },
    }
    
    await fetch(BASE_URL + `user/${id}`, options)
    navigate('/')
    location.reload()   
  }

  return (
    <>
      <Button variant='danger' onClick={handleShowClose}>
        <FaRegTrashCan /> 
      </Button>
      <Offcanvas show={show} onHide={handleShowClose} placement='end' scroll backdrop keyboard>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title className='text-danger text-center fw-bolder'>DELETE ACCOUNT</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Form onSubmit={e => handleSumbit(e)}>
            <Form.Check
              type='checkbox'
              checked={!disable}
              onChange={handleClick}
              id={`delete-confirm-check`}
              label='I would like to permently delete my account.  I understand this is remove all my data and history.  I also understand once I delete my account, I will not be able to recover any of my data.'
            />
            <Button type='submit' variant='danger' className='m-2 mx-auto' disabled={disable}>DELETE MY ACCOUNT</Button>
          </Form>
          <Button variant='success' onClick={handleShowClose}>CANCEL</Button>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  )
}

export default DeleteAlert