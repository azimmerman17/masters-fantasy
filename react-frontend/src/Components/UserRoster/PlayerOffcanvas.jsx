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
import PlayerSelectionCard from "./PlayerSelectionCard";


const PlayerOffcanvas = ({ show, cardName, setShow, i }) => {
  const BASE_URL = import.meta.env.VITE_BASE_URL
  const { playersContext, setPlayersContext } = useContext(PlayersContext)
  const { currentUser, setCurrentUser } = useContext(CurrentUser)
  const { eventConfig, setEventConfig } = useContext(EventConfig)

  if (playersContext &&  currentUser && eventConfig) {
    const { dataSettings } = eventConfig
    const { tournamentYear } = dataSettings
    const { players } = playersContext
    const { user_id, roster } = currentUser
    const { past_champ, usa, intl, wild_card1, wild_card2, wild_card3 } = roster

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


    const playerSelection = playerList.map(player => {
      const { id } = player
      const picture = `https://images.masters.com/players/${tournamentYear}/240x240/${id}.jpg`

      return (
        <PlayerSelectionCard player={player}picture={picture} disable={playerRoster.includes(Number(id))} current={id == roster[key]} currentUser={currentUser} tournamentYear={tournamentYear} column={key} key={`selection-card-${i}-${id}`}/>
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