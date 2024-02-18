import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Form from 'react-bootstrap/Form';

import { FaRegTrashCan } from "react-icons/fa6";

const DeleteAlert = () => {
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
  const handleSumbit = (e) => {
    e.preventDefault()
    console.log('DELETE ACCOUNT')
  }

  return (
    <>
      <Button variant="danger" onClick={handleShowClose}>
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
            <Button type="submit" variant='danger' className='m-2 mx-auto' disabled={disable}>DELETE MY ACCOUNT</Button>
          </Form>
          <Button variant='success' onClick={handleShowClose}>CANCEL</Button>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  )
}

export default DeleteAlert