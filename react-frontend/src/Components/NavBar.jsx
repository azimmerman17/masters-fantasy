import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { useContext } from 'react';

import { CurrentUser } from '../Contexts/CurrentUserContext'
import Login from './Login';
import Logout from './Logout';

const NavBar = () => {
  const { currentUser, setCurrentUser } = useContext(CurrentUser)

  const loggedInNav = () => {
    return (
      <NavDropdown varient='light' title='User Information' id='logged-out-dropdown' className='text-white'>
        <NavDropdown.Item href='/profile'>Profile</NavDropdown.Item>
        <NavDropdown.Item href='/roster'>Manage Roster</NavDropdown.Item>
        <Logout />
      </NavDropdown>
    )
  }

  const loggedOutNav = () => {
    return (
      <NavDropdown varient='light' title='Log in/Sign up' id='logged-out-dropdown' className='text-white'>
        <Login />
      </NavDropdown>
    )
  }

  return (
  <Navbar fixed='top' bg='success' variant='success' expand='xxl'>
  <Container>
    {/* Navbar Home Page / Logo */}
    <Navbar.Brand className='text-white' href='/'><h3>Master's Fantasy Golf</h3></Navbar.Brand>
    <Navbar.Toggle className='text-white bg-white' aria-controls='basic-navbar-nav' />
    <Navbar.Offcanvas id='offcanvasNavbar' aria-labelledby='offcanvasNavbar' placement='end'>
      <Offcanvas.Header closeButton className='bg-success text-white'>
        <Offcanvas.Title id='offcanvasNavbar' className='fs-4 fw-bolder'>
                  {currentUser ? `Welcome ${currentUser.first_name}` : 'Welcome'}
        </Offcanvas.Title>
     </Offcanvas.Header>
     <Offcanvas.Body className='bg-success' as={Container}>
      <Nav className='justify-content-end flex-grow-1 pe-3'>
        <NavDropdown varient='light' title='Tournament Info' id='tournament-info-dropdown' className='text-white'>
          <NavDropdown.Item href='/tournament/leaderboard'>Tournament Leaderboard</NavDropdown.Item>
          <NavDropdown.Item href='/tournament/players'>Players</NavDropdown.Item>
          {/* <NavDropdown.Item href='/tournament/course/'>Course</NavDropdown.Item> */}
        </NavDropdown>
        {/* Fantasy Info */}
        <NavDropdown title='Fantasy Tournament' id='fantasy-info-dropdown'>
          <NavDropdown.Item href='/leaderboard'>Fantasy Leaderboard</NavDropdown.Item>
          <NavDropdown.Item href='/rules'>Official Rules</NavDropdown.Item>
        </NavDropdown>
        {/* User Info */}
        { currentUser ? loggedInNav() : loggedOutNav()}
      </Nav>
     </Offcanvas.Body>
    </Navbar.Offcanvas>
  </Container>
</Navbar>
)

}

export default NavBar