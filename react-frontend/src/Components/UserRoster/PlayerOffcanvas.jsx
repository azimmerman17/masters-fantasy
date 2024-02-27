import { useContext, useState } from "react"
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Container from 'react-bootstrap/Container';
import Alert from "react-bootstrap/Alert";


import { CurrentUser } from "../../Contexts/CurrentUserContext"
import { PlayersContext } from "../../Contexts/PlayersContext"
import { EventConfig } from "../../Contexts/EventConfig"
import HandleDBTransaction from "../../Functions/HandleDBTransaction";
import BASE_URL from "../../assets/Files/BASE_URL";



const PlayerOffcanvas = ({ show, cardName, setShow, i }) => {
  const { playersContext, setPlayersContext } = useContext(PlayersContext)
  const { currentUser, setCurrentUser } = useContext(CurrentUser)
  const { eventConfig, setEventConfig } = useContext(EventConfig)
  let [message, setMessage] = useState(null)
  let [alert, setAlert] = useState(false)

  if (playersContext &&  currentUser && eventConfig) {
    const { dataSettings } = eventConfig
    const { tournamentYear } = dataSettings
    const { players } = playersContext
    const { user_id, roster } = currentUser
    const { past_champ, usa, intl, wild_card1, wild_card2, wild_card3 } = roster
    // console.log(currentUser)

    let playerList = []
    let playerRoster = [past_champ, usa, intl, wild_card1, wild_card2, wild_card3]
    let key
    switch (cardName) {
      case 'Past Champion':
        playerList =  players.filter(player => player.Past === '1')
        key = 'past_champ'
        break
      case 'USA':
        playerList = players.filter(player => player.international !== true)
        key= 'usa'
        break
      case 'International':
        playerList = players.filter(player => player.international === true)
        key= 'intl'
        break
      default:
        playerList = players 
        if (i === 3) key = 'wild_card1'
        else if (i === 4) key = 'wild_card2'
        else if (i === 5) key = 'wild_card3'
    }

    const handleClose = () => setShow(false);

    const handleSelect =  async (e, id) => {
      const { roster } = currentUser
      const { year } = roster

      // if a roster record does not exist - add  NEED TO BUILD AND TEST
    if (!year) {
      // create record in DB
      let path = BASE_URL + 'roster/new'
      let payload = {
        year:  tournamentYear,
        [key]: id
      }
      let insertResponse = await HandleDBTransaction(path, 'POST', payload)
      console.log(insertResponse)
    } else {
      // Record already exists - UPDATE
      let path = BASE_URL + 'roster/' + user_id
      let payload = {
        [key]: id      
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
      
      
      // save player to the DB
      console.log(currentUser) 
      // update the current user
      // close offcanvas
      // reload page?
      // location.reload()

    } 

    const playerSelection = playerList.map(player => {
      const { id, first_name , last_name } = player
      const picture = `https://images.masters.com/players/${tournamentYear}/240x240/${id}.jpg`

      return (
        < Container fluid key={`selection-card-${i}-${id}`}>
          <Card className={`m-1 p-1 text-center${id == roster[key] ? ' border border-success shadow' : (
            playerRoster.includes(Number(id)) ? ' border border-danger shadow' : ''
          )}`} >
            <Image src={picture} className=' mx-auto border rounded-circle roster-img' />
            <Card.Body>
              <Card.Title>{first_name} {last_name}</Card.Title>
              <Button variant="success" onClick={(e) => handleSelect(e, id)} disabled={playerRoster.includes(Number(id))}>Select Player</Button>
              <Alert variant='danger' show={alert}>{message} </Alert>
            </Card.Body>
          </Card>
        </Container>
      )
      
    })

    return (
      <Offcanvas show={show} onHide={handleClose} scroll backdrop keyboard>
        <Offcanvas.Header closeButton >
          <Offcanvas.Title>{cardName}</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {playerSelection}
        </Offcanvas.Body>
      </Offcanvas>
    )
  } 
}

export default PlayerOffcanvas