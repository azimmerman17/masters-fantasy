import { useState } from 'react'
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Alert from 'react-bootstrap/Alert';

import HandleDBTransaction from '../../Functions/HandleDBTransaction';

const PlayerSelectionCard = ({ player, picture, disable, user_id, tournamentYear, column, userRoster, setUserRoster }) => {
  const BASE_URL = import.meta.env.VITE_BASE_URL
  let [message, setMessage] = useState(null)
  let [alert, setAlert] = useState(false)
  const { first_name, last_name, amateur, id } = player

  const handleSelect =  async (e, id) => {
    const { year } = userRoster

    const handleUpdate = (id, key) => {
      console.log(player)
      const newRoster = userRoster.map((player, i) => {
        console.log(id, key)
        // if (i === Number(lineupSpot[lineupSpot.length - 1]) - 1) {
        //   return Number(id)
        // } else return player
      }) 
    }

    // if a roster record does not exist 
    if (!year) {
      // create record in DB
      let path = BASE_URL + 'roster/new'
      let payload = {
        year:  tournamentYear,
        [column]: id,
        user_id: user_id,
      }

      try {
        handleUpdate(id, column)
        // let insertResponse = await HandleDBTransaction(path, 'POST', payload)
        let { status } = insertResponse

        if (status === 201) {


          // location.reload()
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
      handleUpdate(id, column)

      // Record already exists - UPDATE
      let path = BASE_URL + 'roster/' + user_id
      let payload = {
        year:  tournamentYear,
        [column]: id,
        old_id: userRoster[column]
      }
      
      try {
        // let updateResponse = await HandleDBTransaction(path, 'PUT', payload)
        let { status } = updateResponse

        if (status === 201) {
          // location.reload()
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
      <Button className='w-100 m-2 border border-success shadow' variant='success' disabled={disable}>
      <Card className='m-1 p-1 text-center border border-success shadow'>
        <Image src={picture} className=' mx-auto border rounded-circle roster-img' />
        <Card.Body>
          <Card.Title className='fw-bold fs-5'>{first_name} {last_name} {amateur ? '(A)' : null}</Card.Title>
          <a href=''>View Player Profile</a>
          <Button variant='success' onClick={(e) => handleSelect(e, id)} disabled={disable}>Select Player</Button>
          <Alert variant='danger' show={alert}>{message} </Alert>
        </Card.Body>
      </Card>
      </Button>
    </Container>
  )
}

export default PlayerSelectionCard