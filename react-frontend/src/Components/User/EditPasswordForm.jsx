import { useState } from 'react';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';

import EditProfileAlert from './EditProfileAlert';


const EditPasswordForm = ({ currentUser }) => {
  let [showAlert, setShowAlert] = useState(false)
  let [passwordMessage, setPasswordMessage] = useState('Password Update Unsuccessful')
  let [editPassword, SetEditPassword] = useState({
    currentPassword: undefined,
    changePassword: undefined,
    confirmPassword: undefined
  })

  // funtion to change the password
  const handlePasswordSumbit = (e) => {
    e.preventDefault()
    console.log('EDIT PASSWORD')
  }
  
 return (
  <>
    <EditProfileAlert show={showAlert} setShow={setShowAlert} message={passwordMessage} />
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
  </>
 ) 
}

export default EditPasswordForm