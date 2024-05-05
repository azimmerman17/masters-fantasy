import { useContext } from 'react'
import Accordion from 'react-bootstrap/Accordion';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

import { FantasyTournamentConfig } from '../../../Contexts/FantasyTournamentConfig'
import LineupTab from './LineupTab';

const UserLineups = ({ lineups, roster }) => {
  const {fantasyTournamentConfig, setFantasyTournamentConfig} = useContext(FantasyTournamentConfig)

  if (fantasyTournamentConfig) {
    const { currentRound } = fantasyTournamentConfig

    const roundTabs = lineups.map(lineup => {
      const { round } = lineup


      return (
        <Tab eventKey={round} title={`Rd ${round}`} key={`round-${round}`} id={`round-tab-${round}`}>
          <LineupTab lineup={lineup} roster={roster} round={round}/>
        </Tab>
      )
    })

    return (
      <>
      <Accordion flush>
        <Accordion.Item eventKey="0">
          <Accordion.Header>
            <h4 className='text-center'>Lineups</h4>
          </Accordion.Header>
          <Accordion.Body>
            <Tabs defaultActiveKey={currentRound || 1} justify>
              {roundTabs}
            </Tabs>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>


      </>
    )
  }
}

export default UserLineups