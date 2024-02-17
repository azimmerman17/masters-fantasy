import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Form from 'react-bootstrap/Form';

import { FaRegTrashCan } from "react-icons/fa6";

const DeleteAlert = () => {
  const [show, setShow] = useState(false);
  const [disable, setDisable] =useState(true)

  const handleShowClose = () => {
    setDisable(true)
    setShow(!show);
  }

  const handleClick = () => {
    setDisable(!disable)
  }

  const handleSumbit = (e) => {
    e.preventDefault()
    console.log('DELETE ACCOUNT')
  }

  return (
    <>
      <Button variant="danger" onClick={handleShowClose}>
        <FaRegTrashCan /> 
      </Button>

      <Offcanvas show={show} onHide={handleShowClose} scroll backdrop>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title className='text-danger text-center fw-bolder'>DELETE ACCOUNT</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Form onSubmit={e => handleSumbit(e)}>
            <Form.Check
              type='checkbox'
              checked={!disable}
              onClick={handleClick}
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