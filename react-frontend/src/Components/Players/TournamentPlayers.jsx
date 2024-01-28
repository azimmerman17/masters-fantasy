import { useContext } from "react"
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"

import { EventConfig } from "../../Contexts/EventConfig"
import { PlayersContext } from "../../Contexts/PlayersContext"
import InviteeCard from "./InviteeCard"

const TournamentPlayers = () => {
  const { eventConfig, setEventConfig } = useContext(EventConfig)
  const { playersContext, setPlayersContext} = useContext(PlayersContext)

  if (eventConfig && playersContext) {
    console.log(playersContext)
    const { dataSettings } = eventConfig
    const { tournamentYear } = dataSettings
    const { players, past_champions_not_competing } = playersContext
  
    const playerList = players.map(player => {
      const { id } = player
      return <InviteeCard player={player} year={tournamentYear} key={`invitee-card-${id}`} />
    })

    const not_compete = past_champions_not_competing.map((champion, i) => {
      const { firstname, lastname } = champion
      return (
        <Col sm={12} md={6} lg={4} xl={3} className='text-center' key={`past-champions-not-competing-${i}`}>
          {firstname} {lastname}
        </Col>
      )
    })
    
    return (
      <Container fluid>
        <h3 className='text-center'>{tournamentYear} Invitees</h3>
        <Row>
          {playerList}
        </Row>
        <Row className='m-3'>
          <h5 className='text-center'>Past Champions Not Competing</h5>
        </Row>
        <Row>
          {not_compete}
        </Row>
      </Container>
    )

  }
}

export default TournamentPlayers