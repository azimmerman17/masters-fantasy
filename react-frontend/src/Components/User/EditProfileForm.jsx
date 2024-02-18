import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup';

import EditProfileAlert from './EditProfileAlert';
import BASE_URL from '../../assets/Files/BASE_URL';

const EditProfileForm = ({ currentUser }) => {
  let [showAlert, setShowAlert] = useState(false)
  let [userNameEmailList, setUserNameEmailList] = useState([])
  let [usernameUnique, setUsernameUnique] = useState(true)
  let [emailUnique, setEmailUnique] = useState(true)
  let [editUser, SetEditUser] = useState({
    user_name: undefined,
    email: undefined,
    first_name: undefined,
    last_name: undefined,
  })

  useEffect(() => {
    const fetchData = async () => {
      const path = 'user/usernamelist'
      const response = await fetch(BASE_URL + path)
      const data = await response.json()
      setUserNameEmailList(data)
    }
    if (userNameEmailList.length === 0) fetchData()
  },[userNameEmailList, currentUser])

  const message = 'Profile Update Unsuccessful'

  // function to edit profile info
  const handleSumbit = async (e) => {
    e.preventDefault()
    const { user_id } = currentUser

    const options = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'mode': 'no-cors',
      },
      body: JSON.stringify(editUser)
    }
    
    let response = await fetch(BASE_URL + `user/${user_id}`, options)
    const { status } = response
    
    if (status === 200) location.reload() // success reload page
    else setShowAlert(true) // fail - display Error message
  }

  // validate unique username && email
  const checkUserNameEmail = (e, group) => {
    if (group === 'userName') {
      // set varible 
      if (e === '') SetEditUser({ ...editUser, user_name: undefined})
      else SetEditUser({ ...editUser, user_name: e})
      // check for unique 
      if (userNameEmailList[0].includes(e.toLowerCase()) !== true ) setUsernameUnique(true)
      else if (e.length === 0) setUsernameUnique(true)
      else if (e.toLowerCase() == currentUser.user_name) setUsernameUnique(true)
      else setUsernameUnique(false)
    } else {
      // set varible 
      if (e === '') SetEditUser({ ...editUser, email: undefined})
      else SetEditUser({ ...editUser, email: e})
      // check for unique 
      if (userNameEmailList[1].includes(e.toLowerCase()) !== true ) setEmailUnique(true)
      else if (e.length === 0) setEmailUnique(true)
      else if (e.toLowerCase() == currentUser.email) setEmailUnique(true)
      else setEmailUnique(false)
    }
  } 

  return (
    <>
      <EditProfileAlert show={showAlert} setShow={setShowAlert} message={message} status='danger' />
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
          <Form.Label>Email</Form.Label>
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
    </>
  )
}

export default EditProfileForm