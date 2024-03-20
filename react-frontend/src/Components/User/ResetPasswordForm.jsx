import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/esm/Container';

import BASE_URL from '../../assets/Files/BASE_URL';

const ResetPasswordForm = () => {
  let [user_info, setUserInfo] = useState(null)
  let [showForm, setShowForm] = useState(true)

  const handleSubmit = async (e) => {
    e.preventDefault()
    // dont allow password reset if a webdriver is present
    if (window.navigator.webdriver) setShowForm(false)
    else {
    // send to backend
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'mode': 'no-cors',
          user_agent: window.navigator.userAgent
        },
        body: JSON.stringify({user_info: user_info})
      }
      try {
        await fetch(BASE_URL + 'email/forgotpassword', options)
        // show the response message
        setShowForm(false)
      } catch (error) {
        console.error(error)
        alert('Error sending the reset request, please try again') 
      }
    }
  }

    if (showForm) {
      return (
        <Container fluid>
          <h2 className='text-center'>Forgot Password</h2>
          <p>Enter the email address or username associated with your account to receive instructions on resetting your password.</p>
          <Form onSubmit={e => handleSubmit(e)}>
            <Form.Group className="mb-3" controlId="formUsernameOrEmail" onChange={(e) => setUserInfo(e.target.value)}>
              <Form.Label>Username or Email address</Form.Label>
              <Form.Control type="text" placeholder="Enter Username or Email" />
            </Form.Group>
            <Button variant="success" type="submit" disabled={!user_info}>
              Submit
            </Button>
          </Form>
        </Container>
      )
    } else {
      return (
        <Container fluid>
          <h2 className='text-center'>Forgot Password</h2>
          <p>An email has be sent to the account associated with {user_info}</p>
        </Container>

      )
    }
  }

export default ResetPasswordForm