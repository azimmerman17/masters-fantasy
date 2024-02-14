import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useContext } from 'react';

import { CurrentUser } from "../Contexts/CurrentUserContext"
import Login from './Login';
import Logout from './Logout';

const NavBar = () => {
  const { currentUser, setCurrentUser } = useContext(CurrentUser)

  const loggedInNav = () => {
    const { first_name } = currentUser
    return (
      <NavDropdown varient='light' title={`Welcome ${first_name}`} id="logged-out-dropdown" className="text-white">
        <p>Profile</p>
        <p>Manage Roster</p>
        <Logout />
      </NavDropdown>
    )
  }

  const loggedOutNav = () => {
    return (
      <NavDropdown varient='light' title="Log in/Sign up" id="logged-out-dropdown" className="text-white">
        <Login />
      </NavDropdown>
    )
  }

  return (
  <Navbar fixed="top" bg="success" variant="success" expand="xl">
  <Container>
    {/* Navbar Home Page / Logo */}
    <Navbar.Brand className="text-white" href="/"><h3>Master's Fantasy Golf</h3></Navbar.Brand>
    <Navbar.Toggle className="text-white" aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="me-auto">
        {/* Tournamnet Info */}
        <NavDropdown varient='light' title="Tournament Info" id="tournament-info-dropdown" className="text-white">
          <NavDropdown.Item href="/tournament/leaderboard">Tournament Leaderboard</NavDropdown.Item>
          <NavDropdown.Item href="/tournament/players">Players</NavDropdown.Item>
          {/* <NavDropdown.Item href="/tournament/course/">Course</NavDropdown.Item> */}
        </NavDropdown>
        {/* Fantasy Info */}
        <NavDropdown title="Fantasy Tournament" id="fantasy-info-dropdown">
          {/* <NavDropdown.Item href="/">Fantasy Leaderboard</NavDropdown.Item> */}
        </NavDropdown>
        {/* User Info */}
        { currentUser ? loggedInNav() : loggedOutNav()}
          {/* Navbar Routes */}
          {/* <Nav.Link className="text-white" href="/">Profile</Nav.Link> */}
      </Nav>
    </Navbar.Collapse>
  </Container>
</Navbar>
)

}

export default NavBar