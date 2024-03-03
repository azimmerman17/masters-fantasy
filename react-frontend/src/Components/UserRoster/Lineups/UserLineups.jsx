import { useContext } from "react"
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

import { FantasyTournamentConfig } from "../../../Contexts/FantasyTournamentConfig"
import LineupTab from "./LineupTab";

const UserLineups = ({ lineups, roster }) => {
  const {fantasyTournamentConfig, setFantasyTournamentConfig} = useContext(FantasyTournamentConfig)

  if (fantasyTournamentConfig) {
    const { round1Lock, round2Lock, round3Lock, round4Lock, currentRound } = fantasyTournamentConfig 

    const roundTabs = lineups.map(lineup => {
      const { round, player1, player2, player3 } = lineup

      return (
        <Tab eventKey={`Rd ${round}`} title={`Rd ${round}`} key={`round-${round}`}>
          <LineupTab lineup={lineup} roster={roster} round={round}/>
        </Tab>
      )
    })

    return (
      <Tabs defaultActiveKey={currentRound - 1} justify>
        {roundTabs}
      </Tabs>
    )
  }
}

export default UserLineups