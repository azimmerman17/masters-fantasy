import { useState } from "react"
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Alert from "react-bootstrap/Alert";

import HandleDBTransaction from "../../Functions/HandleDBTransaction";
import BASE_URL from "../../assets/Files/BASE_URL";
import CreateUpdateLineup from "../../Functions/CreateUpdateLineup";

const PlayerSelectionCard = ({ player, picture, disable, current, currentUser, tournamentYear, column }) => {
  console.log(currentUser)
  let [message, setMessage] = useState(null)
  let [alert, setAlert] = useState(false)
  const { first_name, last_name, amateur, id } = player

  const handleSelect =  async (e, id) => {
    const { roster, user_id } = currentUser
    const { year } = roster

    // if a roster record does not exist 
    if (!year) {
      // create record in DB
      let path = BASE_URL + 'roster/new'
      let payload = {
        year:  tournamentYear,
        [column]: id,
        user_id: user_id
      }

      try {
        let insertResponse = await HandleDBTransaction(path, 'POST', payload)
        let { status } = insertResponse

        if (status === 201) {
          location.reload()
        } else {
          let data = await insertResponse.json()
          setMessage(data.msg)
          setAlert(true)
        }
      } catch (error) {
        setMessage('Roster not saved')
        setAlert(true)
      }
    } else {
      // Record already exists - UPDATE
      let path = BASE_URL + 'roster/' + user_id
      let payload = {
        [column]: id      
      }

      try {
        let updateResponse = await HandleDBTransaction(path, 'PUT', payload)
        let { status } = updateResponse

        if (status === 201) {
          location.reload()
        } else {
          let data = await updateResponse.json()
          setMessage(data.msg)
          setAlert(true)
        }
      } catch (error) {
        setMessage('Roster not saved')
        setAlert(true)
      }
    }
  } 

  return (
    <Container fluid>
      <Card className={`m-1 p-1 text-center${current ? ' border border-success shadow' : (
        disable ? ' border border-danger shadow' : ''
      )}`} >
        <Image src={picture} className=' mx-auto border rounded-circle roster-img' />
        <Card.Body>
          <Card.Title>{first_name} {last_name} {amateur ? '(A)' : null}</Card.Title>
          <Button variant="success" onClick={(e) => handleSelect(e, id)} disabled={disable}>Select Player</Button>
          <Alert variant='danger' show={alert}>{message} </Alert>
        </Card.Body>
      </Card>
    </Container>
  )
}

export default PlayerSelectionCard