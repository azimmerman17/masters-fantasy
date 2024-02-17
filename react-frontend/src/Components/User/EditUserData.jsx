import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup';
import { FaUserEdit } from "react-icons/fa";

const BASE_URL = 'http://localhost:8080/'


const EditUserData = ({ currentUser }) => {
  let [show, setShow] = useState(false);
  let [userNameEmailList, setUserNameEmailList] = useState([])
  let [usernameUnique, setUsernameUnique] = useState(true)
  let [emailUnique, setEmailUnique] = useState(true)
  let [editUser, SetEditUser] = useState({
    user_name: undefined,
    email: undefined,
    first_name: undefined,
    last_name: undefined,
  })
  let [editPassword, SetEditPassword] = useState({
    currentPassword: undefined,
    changePassword: undefined,
    confirmPassword: undefined
  })

  useEffect(() => {
    const fetchData = async () => {
      const path = 'user/usernamelist'
      const response = await fetch(BASE_URL + path)
      const data = await response.json()
      setUserNameEmailList(data)
    }
    if (userNameEmailList.length === 0) fetchData()
  },[userNameEmailList])

  //  opens and closes the offcanvas
  const handleShowClose = () => {
    setShow(!show);
  }

  // function to edit profile info
  const handleSumbit = (e) => {
    e.preventDefault()
    console.log('EDIT PROFILE')
  }

  // funtion to change the password
  const handlePasswordSumbit = (e) => {
    e.preventDefault()
    console.log('EDIT PASSWORD')
  }

  // validate unique username && email
  const checkUserNameEmail = (e, group) => {
    if (group === 'userName') {
      // set varible 
      if (e === '') SetEditUser({ ...editUser, user_name: undefined})
      else SetEditUser({ ...editUser, user_name: e})
      // check for unique 
      if (userNameEmailList[0].includes(e) !== true ) setUsernameUnique(true)
      else if (e.length === 0) setUsernameUnique(true)
      else if (editUser.user_name === currentUser.user_name) setUsernameUnique(true)
      else setUsernameUnique(false)
    } else {
      // set varible 
      if (e === '') SetEditUser({ ...editUser, email: undefined})
      else SetEditUser({ ...editUser, email: e})
      // check for unique 
      if (userNameEmailList[1].includes(e) !== true ) setEmailUnique(true)
      else if (e.length === 0) setEmailUnique(true)
      else if (editUser.email === currentUser.email) setEmailUnique(true)
      else setEmailUnique(false)
    }
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
          <h5 className='text-center'>Profile Information</h5>
          <Form onSubmit={e => handleSumbit(e)}>
            <Form.Group as={Col} md={6} controlId="editUserFirstName" className="mb-3" onChange={(e) => SetEditUser({ ...editUser, first_name: e.target.value})}>
              <Form.Label>First name</Form.Label>
              <Form.Control
                type="text"
                placeholder={currentUser.first_name}
                maxLength={20}
              />
            </Form.Group>
            <Form.Group as={Col} md={6} controlId="editUserLastName" className="mb-3" onChange={(e) => SetEditUser({ ...editUser, last_name: e.target.value})}>
              <Form.Label>Last name</Form.Label>
              <Form.Control
                type="text"
                placeholder={currentUser.last_name}
                maxLength={20}
              />
            </Form.Group>
            <Form.Group as={Col} md={4} controlId="editUserUsername" className="mb-3" onChange={(e) => checkUserNameEmail(e.target.value, 'userName')}>
              <Form.Label>Username</Form.Label>
              <InputGroup hasValidation>
                <Form.Control
                  type="text"
                  placeholder={currentUser.user_name}
                  isInvalid={!usernameUnique}
                  maxLength={20}
                />
                <Form.Control.Feedback type="invalid">
                  Username not available
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
            <Form.Group as={Col} md={8} controlId="editUserEmail" className="mb-3" onChange={(e) => checkUserNameEmail(e.target.value, 'email')}>
              <Form.Label>Email<sup>*</sup></Form.Label>
              <Form.Control 
                type="email"
                placeholder={currentUser.email}
                isInvalid={!emailUnique}
                maxLength={30}
              />
              <Form.Control.Feedback type="invalid">
                Email not available
              </Form.Control.Feedback>
            </Form.Group>
            <Button 
              type="submit" 
              variant='primary' 
              className='m-2 mx-auto'
              disabled={!usernameUnique || !emailUnique || (editUser.user_name === undefined && editUser.email === undefined && editUser.first_name === undefined && editUser.last_name === undefined)}
            >
              Submit
            </Button>
          </Form>
          <hr/>
          <h5 className='text-center'>Change Password</h5>
          <Form onSubmit={e => handlePasswordSumbit(e)}>
            <Form.Group as={Col} md={6} controlId="currentUserPassword" className="mb-3" onChange={(e) => SetEditPassword({...editPassword, currentPassword: e.target.value})}>
              <Form.Label>Current Password</Form.Label>
              <Form.Control 
                type="password"
                placeholder="Current Password"
                required/>
            </Form.Group>
                <Form.Group as={Col} md={6} controlId="changeUserPasword" className="mb-3" onChange={(e) => SetEditPassword({...editPassword, changePassword: e.target.value})}>
              <Form.Label>New Password</Form.Label>
              <Form.Control 
                type="password"
                placeholder="New Password"
                required 
                minLength={6}
                maxLength={32}/>
            </Form.Group>
            <Form.Group as={Col} md={6} controlId="changeUserPaswordConfirm" className="mb-3" onChange={(e) => SetEditPassword({...editPassword, confirmPassword: e.target.value})}>
              <Form.Label>Confirm New Password</Form.Label>
              <Form.Control 
                type="password" 
                placeholder="Confirm New Password"
                required 
                isInvalid={editPassword.password !== editPassword.password_confirm} />
              <Form.Control.Feedback type="invalid">
                Passwords do not match
              </Form.Control.Feedback>
            </Form.Group>
            <Button 
              type="submit"
              variant='primary' 
              className='m-2 mx-auto' 
              disabled={!editPassword.changePassword || !editPassword.currentPassword || editPassword.changePassword !== editPassword.confirmPassword} 
            >
              Change Password
            </Button>
          </Form>
          <Col className='text-end'>
            <Button variant='warning' onClick={handleShowClose}>CANCEL</Button>
          </Col>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  )
}

export default EditUserData