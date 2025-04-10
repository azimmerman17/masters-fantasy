import { useContext } from 'react'
import Offcanvas from 'react-bootstrap/Offcanvas';

import { PlayersContext } from '../../Contexts/PlayersContext'
import { UserRoster } from '../../Contexts/UserRosterContext';
import { EventConfig } from '../../Contexts/EventConfig'
import { CurrentUser } from '../../Contexts/CurrentUserContext';

import PlayerSelectionCard from './PlayerSelectionCard';


const PlayerOffcanvas = ({ show, cardName, setShow, i }) => {
  const { playersContext, setPlayersContext } = useContext(PlayersContext)
  const { eventConfig, setEventConfig } = useContext(EventConfig)
  const { userRoster, setUserRoster } = useContext(UserRoster)
  const { currentUser, setCurrentUser } = useContext(CurrentUser)

  if (playersContext &&  userRoster && eventConfig) {
    const { dataSettings } = eventConfig
    const { tournamentYear } = dataSettings
    const { players } = playersContext
    const { roster } = userRoster
    const { past_champ, usa, intl, wild_card1, wild_card2, wild_card3 } = roster

    let playerList = []
    let playerRoster = [past_champ, usa, intl, wild_card1, wild_card2, wild_card3]
    let key
    switch (cardName) {
      case 'Past Champion':
        playerList =  players.filter(player => player.past_champion === true)
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

    const playerSelection = playerList.map(player => {
      const { id } = player
      const picture = `https://images.masters.com/players/${tournamentYear}/240x240/${id}.jpg`

      return (
        <PlayerSelectionCard player={player} picture={picture} disable={playerRoster.includes(Number(id))} tournamentYear={tournamentYear} column={key} key={`selection-card-${i}-${id}`} currentUser={currentUser} setCurrentUser={setCurrentUser} setShow={setShow}/>
      )
      
    })

    return (
      <Offcanvas show={show} backdrop scroll>
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