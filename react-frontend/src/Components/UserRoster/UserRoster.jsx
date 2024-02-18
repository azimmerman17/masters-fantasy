import { useContext } from "react"
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"

import { EventConfig } from "../../Contexts/EventConfig"
import { PlayersContext } from "../../Contexts/PlayersContext"

const UserRoster = () => {
  const { eventConfig, setEventConfig } = useContext(EventConfig)
  const { playersContext, setPlayersContext} = useContext(PlayersContext)

  if (eventConfig && playersContext) {
    return (
      <div>
        User Roster
      </div>
    )
  }
  
}

export default UserRoster