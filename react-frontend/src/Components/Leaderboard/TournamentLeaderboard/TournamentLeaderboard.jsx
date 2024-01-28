// Component to display the tournament's leaderboard
import { useContext } from 'react'
import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table"



import { TournamentLeaderboardContext } from '../../../Contexts/TournamentLeaderboard'
import LeaderboardTableHeader from '../LeaderboardTableHeaders';
import LeaderboardHeaders from '../../../assets/Files/LeaderboardHeaders';
import LeaderboardTableData from '../LeaderboardTableData';

const TournamentLeaderboard = () => {
  const { tournamentLeaderboardContext, setTournamentLeaderboardContext } = useContext(TournamentLeaderboardContext)

  if (tournamentLeaderboardContext) {
    const { currentRound, player, statusRound } = tournamentLeaderboardContext

    let roundNumber
    for (let i = 0; i < currentRound.length; i++) {
      if (currentRound[i] == 1) {
        roundNumber = i + 1
        break
      }
    }

    const playerList = player.map((golfer, i) => {
      const { id } = golfer

      const rowData = LeaderboardHeaders.map(header => {
        return <LeaderboardTableData player={golfer} header={header} view={'tournament'} key={`leaderboard-${id}-row-${header}`} />
      })

      return (
        <tr key={`leaderboard-${id}-row`}>
          {rowData}
        </tr>
      )
    })



    return (
      <Container fluid>
        <h3 className='text-center'>Round {roundNumber}</h3>
        <Table 
          className='mx-0 mt-2 mb-0 my-auto'
          size='sm'
          hover
          responsive
        >
          <thead>
            <LeaderboardTableHeader />
          </thead>
          <tbody>
            {playerList}
          </tbody>
        </Table>
      </Container>
    )
  }

}

export default TournamentLeaderboard