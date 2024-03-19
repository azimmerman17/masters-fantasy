import { useState } from "react"

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Container from "react-bootstrap/Container";

import EditProfileAlert from './EditProfileAlert';
import BASE_URL from '../../assets/Files/BASE_URL';

const ResetPassword = () => {
  let [showAlert, setShowAlert] = useState(false)
  let [resetPassword, SetResetPassword] = useState({
    changePassword: undefined,
    confirmPassword: undefined
  })
  
  const handlePasswordSumbit = async (e) => {
    e.preventDefault()

    console.log(resetPassword)
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'mode': 'no-cors',
      },
      body: JSON.stringify(resetPassword)
    }

    let response = await fetch(BASE_URL + `email/resetpassword`, options)
    if (response) setShowAlert(true)  // show alert
  }


  return (
    <Container>
    <EditProfileAlert show={showAlert} setShow={setShowAlert} message={'Password Reset Unsuccessful'} status={'danger'} />
    <h5 className='text-center'>Reset Password</h5>
    <Form onSubmit={e => handlePasswordSumbit(e)}>
      <Form.Group as={Col} md={6} controlId="changeUserPasword" className="mb-3" onChange={(e) => SetResetPassword({...resetPassword, changePassword: e.target.value})}>
        <Form.Label>New Password<sup>*</sup></Form.Label>
        <Form.Control 
          type="password"
          placeholder="New Password"
          required 
          minLength={6}
          maxLength={32}/>
      </Form.Group>
      <Form.Group as={Col} md={6} controlId="changeUserPaswordConfirm" className="mb-3" onChange={(e) => SetResetPassword({...resetPassword, confirmPassword: e.target.value})}>
        <Form.Label>Confirm New Password<sup>*</sup></Form.Label>
        <Form.Control 
          type="password" 
          placeholder="Confirm New Password"
          required 
          isInvalid={resetPassword.password !== resetPassword.password_confirm} />
        <Form.Control.Feedback type="invalid">
          Passwords do not match
        </Form.Control.Feedback>
      </Form.Group>
      <Button 
        type="submit"
        variant='primary' 
        className='m-2 mx-auto' 
        disabled={resetPassword.changePassword.length < 6 || !resetPassword.changePassword || resetPassword.changePassword !== resetPassword.confirmPassword} 
      >
        Change Password
      </Button>
    </Form>
  </Container>

  )
}

export default ResetPassword