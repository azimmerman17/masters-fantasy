import Container from 'react-bootstrap/Container';
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';

const BASE_URL = 'http://localhost:8080/'

const SignUp = () => {
  let [validated, setValidated] = useState(false)
  let [user, setUser] = useState({
		first_name: '',
		last_name: '',
    user_name: '',
		email: '',
		password: '',
    password_confirm: ''
	})
  let [userNameEmailList, setUserNameEmailList] = useState([])
  let [usernameUnique, setUsernameUnique] = useState(false)
  let [emailUnique, setEmailUnique] = useState(false)

  useEffect(() => {

    const fetchData = async () => {
      const path = 'user/usernamelist'
      const response = await fetch(BASE_URL + path)
      const data = await response.json()
      setUserNameEmailList(data)
    }
    if (userNameEmailList.length === 0) fetchData()
  },[userNameEmailList])

  // validate unique username && email
  const checkUserNameEmail = (e, group) => {
    if (group === 'userName') {
      setUser({ ...user, user_name: e})
      if (userNameEmailList[0].includes(e) === true) setUsernameUnique(false)
      else if (e.length === 0) setUsernameUnique(false)
      else setUsernameUnique(true)
    } else {
      setUser({ ...user, email: e})
      if (userNameEmailList[1].includes(e) === true) setEmailUnique(false)
      else if (e.length === 0) setEmailUnique(false)
      else setEmailUnique(true)
    }
  } 
  
  // validate matching passwords
  const validatePasswords = (e, group) => {
    if (group === 'confirm') setUser({ ...user, password_confirm: e})
    else setUser({ ...user, password: e})
  }

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
    if (validated) {
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'mode': 'no-cors',
        },
        body: JSON.stringify(user)
      }
      
      await fetch(BASE_URL + 'user/new', options)
    }
  };

  return (
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
    <Row className="mb-3">
      <Form.Group as={Col} md={6} controlId="newUserFirstName" className="mb-3" onChange={(e) => setUser({ ...user, first_name: e.target.value})}>
        <Form.Label>First name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter First name"
          maxLength={20}
        />
      </Form.Group>
      <Form.Group as={Col} md={6} controlId="newUserLastName" className="mb-3" onChange={(e) => setUser({ ...user, last_name: e.target.value})}>
        <Form.Label>Last name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter Last name"
          maxLength={20}
        />
      </Form.Group>
    </Row>
    <Row className="mb-3">
      <Form.Group as={Col} md={4} controlId="newUserUsername" className="mb-3" onChange={(e) => checkUserNameEmail(e.target.value, 'userName')}>
        <Form.Label>Username<sup>*</sup></Form.Label>
        <InputGroup hasValidation>
          <Form.Control
            type="text"
            placeholder="Enter Username"
            required
            isInvalid={!usernameUnique}
            maxLength={20}
          />
          <Form.Control.Feedback type="invalid">
            {usernameUnique === false ? 'Username not available' : 'Please choose a username'}
          </Form.Control.Feedback>
        </InputGroup>
      </Form.Group>
      <Form.Group as={Col} md={8} controlId="newUserEmail" className="mb-3" onChange={(e) => checkUserNameEmail(e.target.value, 'email')}>
        <Form.Label>Email<sup>*</sup></Form.Label>
        <Form.Control 
          type="email"
          placeholder="Enter Email"
          required
          isInvalid={!emailUnique}
          maxLength={30} />
        <Form.Control.Feedback type="invalid">
        {usernameUnique === false ? 'Email not available' : ' Please provide a valid email'}
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group as={Col} md={6} controlId="newUserPasword" className="mb-3" onChange={(e) => validatePasswords(e.target.value)}>
        <Form.Label>Password</Form.Label>
        <Form.Control 
          type="password"
          placeholder="Enter Password"
          required 
          minLength={6}
          maxLength={32}/>
        <Form.Control.Feedback type="invalid">
          {user.password < 6 || user.password.length >32 ? 'Password is too long/short' : 'Please provide a password'}
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group as={Col} md={6} controlId="newUserPaswordConfirm" className="mb-3" onChange={(e) => validatePasswords(e.target.value, 'confirm')}>
        <Form.Label>Confirm Password</Form.Label>
        <Form.Control 
          type="password" 
          placeholder="Confirm Password"
          required 
          isInvalid={user.password !== user.password_confirm} />
        <Form.Control.Feedback type="invalid">
          Passwords do not match
        </Form.Control.Feedback>
      </Form.Group>
    </Row>

    <Button 
    type="submit"
    disabled={user.password === null || user.password.length < 6 || user.password.length> 32 || user.password !== user.password_confirm || !usernameUnique || !emailUnique}
    >
      Submit form
    </Button>
  </Form>
  );
}

export default SignUp