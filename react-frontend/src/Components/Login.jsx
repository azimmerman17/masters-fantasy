import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import Container from 'react-bootstrap/esm/Container';
import Button from 'react-bootstrap/Button';


import { CurrentUser } from '../Contexts/CurrentUserContext'

const Login = () => {
  const BASE_URL = import.meta.env.VITE_BASE_URL
  const { currentUser, setCurrentUser } = useContext(CurrentUser)
  const navigate = useNavigate();
  let [validated, setValidated] = useState(false)
  let [errorMessage, setErrorMessage] = useState(null)
  let [user, setUser] = useState({
    user_name: '',
    password: ''
  })

  // Handle the Submit
  const handleSubmit = async (e) => {
    const form = e.currentTarget;
    e.preventDefault()

    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }
    
    setValidated(true);

    // now submit the form
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'mode': 'no-cors',
      },
      body: JSON.stringify(user)
    }

    let response = await fetch(BASE_URL + 'auth', options)

    const data = await response.json()
    if (response.status === 200) {
      setCurrentUser(data.user)
      localStorage.setItem('token', data.token)
      setErrorMessage(null)
      navigate('/')
      location.reload()
    } else {
      setErrorMessage(data.message)
    }
  };

  return (
    <Container id='log-in-form' style={{maxWidth: '300px'}}>
      {!errorMessage ? <p style={{minHeight: '30px'}}></p> : <p className='mt-2 mb-2 bg-danger-subtle border border-danger text-center rounded-pill'>{errorMessage}</p>}
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Form.Group className='mb-3 login-form-group' as={Col}  controlId='loginUserNameEmail' onChange={e => setUser({...user, user_name: e.target.value })}>
          <Form.Label>Username or Email Address</Form.Label>
          <Form.Control 
            type='text' 
            placeholder='Enter Username or Email Address' 
            required/>
        </Form.Group>
        <Form.Group className='mb-3 login-form-group'  as={Col} controlId='loginPassword' onChange={e => setUser({...user, password: e.target.value })}>
          <Form.Label>Password</Form.Label>
          <Form.Control 
            type='password' 
            placeholder='Enter Password' 
            required/>
        </Form.Group>
        <Button variant='success' type='submit' disabled={user.password === '' || user.user_name === ''}>
          Submit
        </Button>
      </Form>
      <hr />
      <Row>
        <Col>
          <a href='/newUser' className='text-success'>Create Account</a>
        </Col>
        <Col>
          <a href='/forgot-password' className='text-success'>Forgot Password</a>
        </Col>
      </Row>
    </Container>
  );
}

export default Login