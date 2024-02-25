import { useContext } from "react"
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Container from 'react-bootstrap/Container';


import { CurrentUser } from "../../Contexts/CurrentUserContext"
import { PlayersContext } from "../../Contexts/PlayersContext"
import { EventConfig } from "../../Contexts/EventConfig"



const PlayerOffcanvas = ({ show, cardName, setShow, i }) => {
  const { playersContext, setPlayersContext } = useContext(PlayersContext)
  const { currentUser, setCurrentUser } = useContext(CurrentUser)
  const { eventConfig, setEventConfig } = useContext(EventConfig)

  if (playersContext &&  currentUser && eventConfig) {
    const { dataSettings } = eventConfig
    const { tournamentYear } = dataSettings
    const { players } = playersContext
    // console.log(currentUser)

    let playerList = []

    switch (cardName) {
      case 'Past Champion':
        playerList =  players.filter(player => player.Past === '1')
        break
      case 'USA':
        playerList = players.filter(player => player.international !== true)
        break
      case 'International':
        playerList = players.filter(player => player.international === true)
        break
      default:
        playerList = players 
    }


    const handleClose = () => setShow(false);
    const handleSelect = (e, id) => {
      const { roster } = currentUser
      const { year } = roster

      // if a roster record does not exist - add
    if (!year) {
      // create record in DB

      // add year to the current user
      setCurrentUser({...CurrentUser, year: tournamentYear})
    }


      switch (i) {
        case 0: // Past Champion
          // Send the player id to the DB

          // Update the currentUser
          // setCurrentUser({...CurrentUser, past_champ: id})
          break
        case 1: // USA
          // Send the player id to the DB

          // Update the currentUser
          setCurrentUser({...CurrentUser, usa: id})
          break
        case 2: // Intl
          // Send the player id to the DB

          // Update the currentUser
          setCurrentUser({...CurrentUser, intl: id})
          break
        case 3: // Wild Card 1
          // Send the player id to the DB

          // Update the currentUser
          setCurrentUser({...CurrentUser, wild_card1: id})
          break
        case 4: // Wild Card 2
          // Send the player id to the DB

          // Update the currentUser
          setCurrentUser({...CurrentUser, wild_card2: id})
          break
        case 5: // Wild Card 3
          // Send the player id to the DB

          // Update the currentUser
          setCurrentUser({...CurrentUser, wild_card3: id})
          break
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
          <Card className='m-1 p-1 text-center' >
            <Image src={picture} className=' mx-auto border rounded-circle roster-img' />
            <Card.Body>
              <Card.Title>{first_name} {last_name}</Card.Title>
              <Button variant="success" onClick={(e) => handleSelect(e, id)}>Select Player</Button>
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