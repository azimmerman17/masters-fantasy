import { useContext, useEffect, useState } from "react"
import { useParams } from 'react-router-dom';
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"

import { IoGolf } from "react-icons/io5"

import { CurrentUser } from "../../Contexts/CurrentUserContext";
import DeleteAlert from "./DeleteAlert";
import DisplayPersonalData from "./DisplayPersonalData";
import EditUserData from "./EditUserData";

const BASE_URL = 'http://localhost:8080/'

const UserProfile = () => {
  const { username } = useParams()
  const {currentUser, setCurrentUser} = useContext(CurrentUser)

  let [ user, setUser ] = useState()
  let [ hidePersonalData, setHidePersonalData ] = useState(true)

  useEffect(() => {
    const fetchUser = async (username) => {
      const options = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'mode': 'no-cors',
        },
      }
      
      let foundUser = await fetch(BASE_URL + `user/${username}`, options)
      const data = await foundUser.json()
      setUser(data)
      setHidePersonalData(true)
    }
    
    if (!user) {
      if (!username) {
        setUser(currentUser)
        setHidePersonalData(false)
      }
      else fetchUser(username)
      
      if (!username) setHidePersonalData(false)
      else if (currentUser && currentUser.user_name == username) setHidePersonalData(false)
    else setHidePersonalData(true)
} 
}, [user, currentUser])

if (user) {
  const { appearances, best_finish, email, first_name, last_name, low_score, user_name, wins } = user

  return (
      <Container fluid>
        <Row>
          <Col className='text-center mt-4' xs={12}>
            <IoGolf className='bg-success text-white border border-success rounded-circle' style={{height:'75px', width:'75px'}}/>
          </Col>
          <Col xs={12} className='mt-2'>
            <h2 className='text-center'>{first_name} {last_name}</h2>
          </Col>
        </Row>
        <hr/>
        <Row>
          <Col sm={12} md={6}>
           <DisplayPersonalData varible={user_name} label='Username' hide={false} hidePersonalData={hidePersonalData} />
          </Col>
          <Col sm={12} md={6}>
            <DisplayPersonalData varible={email} label='Email' hide={true} hidePersonalData={hidePersonalData} />
          </Col>
        </Row>
        <Row>
          {hidePersonalData ? null : (
            <Col className='text-end'>
              <EditUserData currentUser={currentUser} setCurrentUser={setCurrentUser}/>
              <DeleteAlert />
            </Col>
          )}
        </Row>
        <hr className='mt-2'/>
        <Row>
          <Col xs={6} md={3}>
            <DisplayPersonalData varible={appearances} label='Years Played' hide={false} hidePersonalData={hidePersonalData} />
          </Col>
          <Col xs={6} md={3}>
            <DisplayPersonalData varible={wins} label='Wins' hide={false} hidePersonalData={hidePersonalData} />
          </Col>
          <Col xs={6} md={3}>
            <DisplayPersonalData varible={best_finish ? best_finish : 'N/A'} label='Best Finish' hide={false} hidePersonalData={hidePersonalData} />
          </Col>
          <Col xs={6} md={3}>
            <DisplayPersonalData varible={low_score ? low_score : 'N/A'} label='Low Score' hide={false} hidePersonalData={hidePersonalData} />
          </Col>          
        </Row>
        <hr className='mt-2'/>
      </Container>
    )
}

}

export default UserProfile