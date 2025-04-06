import { useState } from 'react'
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';

import HandleDBTransaction from '../../Functions/HandleDBTransaction';

const PlayerSelectionCard = ({ player, picture, disable, tournamentYear, column, currentUser, setCurrentUser, setShow }) => {
  const BASE_URL = import.meta.env.VITE_BASE_URL
  let [message, setMessage] = useState(null)
  let [alert, setAlert] = useState(false)
  const { first_name, last_name, amateur, id } = player

  const { roster, user_id } = currentUser

  const handleSelect =  async (e, id) => {
    const { year } = roster

    const handleUpdate = (id, key) => {
      // console.log(currentUser)
      setCurrentUser({
        ...currentUser,
        roster : {
          ...roster,
          [key]: id,
          year: tournamentYear
        },

      })
    }

    let path
    let payload
    let method
    // if a roster record does not exist 
    if (!year) {
      // create record in DB
      path = BASE_URL + 'roster/new'
      payload = {
        year:  tournamentYear,
        [column]: id,
        user_id: user_id,
      }
      method = 'POST'
    } else { // Record already exists - UPDATE

      path = BASE_URL + 'roster/' + user_id
      payload = {
        year:  tournamentYear,
        [column]: id,
        old_id: roster[column]
      }
      method = 'PUT'
    } 

    try {
      let insertResponse = await HandleDBTransaction(path, method , payload)
      let { status } = insertResponse

      if (status < 300) {
        handleUpdate(id, column)
        setShow(false)
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
  }
  

  return (
      <Button className='w-100 m-2 border border-success shadow' variant='success' disabled={disable} onClick={(e) => handleSelect(e, id)}>
        <Card className='m-1 p-1 text-center border border-success shadow'>
          <Image src={picture} className=' mx-auto border rounded-circle roster-img' />
          <Card.Body>
            <Card.Title className='fw-bold fs-5'>{first_name} {last_name} {amateur ? '(A)' : null}</Card.Title>
            {/* <a href=''>View Player Profile</a> */}
            <Alert variant='danger' show={alert}>{message} </Alert>
          </Card.Body>
        </Card>
      </Button>
  )
}

export default PlayerSelectionCard