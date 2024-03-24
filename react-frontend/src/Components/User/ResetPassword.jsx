import { useState } from "react"
import { useSearchParams } from "react-router-dom";

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Container from "react-bootstrap/Container";

import EditProfileAlert from './EditProfileAlert';
import Login from "../Login";

const ResetPassword = () => {
  const BASE_URL = import.meta.env.VITE_BASE_URL
  const [searchParams, setSearchParams] = useSearchParams();  
  let [showAlert, setShowAlert] = useState(false)
  let [alert, setAlert] = useState('Password Reset Unsuccessful')
  let [resetPassword, SetResetPassword] = useState({
    token: searchParams.get('token'),
    changePassword: undefined,
    confirmPassword: undefined
  })
  
  const handlePasswordSumbit = async (e) => {
    e.preventDefault()

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'mode': 'no-cors',
      },
      body: JSON.stringify(resetPassword)
    }

    let response = await fetch(BASE_URL + `email/resetpassword`, options)
    if (response.status === 202) {
      setAlert('Password Update Successful - Please sign in')
      setShowAlert(true)  // show success alert and login page
    } else setShowAlert(true)  // show failed alert
  }  

  if (alert ==='Password Reset Unsuccessful') {
    return (
      <Container className='my-2' fliud>
      <EditProfileAlert show={showAlert} setShow={setShowAlert} message={alert} status={'danger'} />
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
          disabled={(resetPassword.changePassword && resetPassword.changePassword.length < 6) || !resetPassword.changePassword || resetPassword.changePassword !== resetPassword.confirmPassword} 
        >
          Change Password
        </Button>
      </Form>
    </Container>
    )
  } else {
    return (
      <Container className='my-2' fluid>
        <EditProfileAlert show={showAlert} setShow={setShowAlert} message={alert} status={'success'} />
        <Login />
      </Container>
    )
  }
}


export default ResetPassword