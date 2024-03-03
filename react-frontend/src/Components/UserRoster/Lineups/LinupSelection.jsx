import { useContext } from "react"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Image from "react-bootstrap/Image"

import { EventConfig } from "../../../Contexts/EventConfig"
import { FantasyTournamentConfig } from "../../../Contexts/FantasyTournamentConfig"
import SelectionDropdown from "./SelectionDropDown"


const LineupSelection =({ playersRoster, player, roundLineup, round }) => {
  const { eventConfig, setEventConfig } = useContext(EventConfig)
  const {fantasyTournamentConfig, setFantasyTournamentConfig} = useContext(FantasyTournamentConfig)

  if (eventConfig && fantasyTournamentConfig) {
    const { round1Lock, round2Lock, round3Lock, round4Lock, currentRound } = fantasyTournamentConfig 
    const { dataSettings } = eventConfig
    const { tournamentYear } = dataSettings

    let picture
    if (player) picture = `https://images.masters.com/players/${tournamentYear}/240x240/${player}.jpg`

    let locked = true
    switch (round) {
      case 1:
        locked = round1Lock
      case 2:
        locked = round2Lock
      case 3:
        locked = round3Lock
      case 4:
        locked = round4Lock
    }

    let selectedPlayer =  playersRoster.filter(rosterPlayer => rosterPlayer.id == player)[0]
    const { first_name, last_name } = selectedPlayer

    return (
      <Row className='border rounded my-1'>
        <Col xs={3}>
          {player ? <Image src={picture} className=' mx-auto border rounded-circle lineup-img' /> : null}
        </Col>
        <Col xs={9} className='my-auto'>
          {!locked ? <h6 className='fs-5'>{first_name} {last_name}</h6> : <SelectionDropdown playersRoster={playersRoster} selectedPlayer={selectedPlayer} roundLineup={roundLineup} round={round} />}
        </Col>
      </Row>
    )
  }
}

export default LineupSelection