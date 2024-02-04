import LeaderboardHeaders from "../../assets/Files/LeaderboardHeaders"


const LeaderboardTableHeader = () => {
 
  return (
    <tr>
      {LeaderboardHeaders.map(item => {

        if (item === 'move' && window.innerWidth < 775) return null
        if ((item == 'R1' || item == 'R2' || item == 'R3' || item == 'R4' || item === 'STROKES' ) && window.innerWidth < 500) return null

        if (item === 'STROKES') {
          return(
            <th key={`header-${item}`} className='text-center leaderboard-header'>
              TOTAL
            </th>
            )
        }
        

        return(
        <th key={`header-${item}`} className='text-center leaderboard-header'>
          {item === 'move' ? null :  item}
        </th>
        )
      })}
    </tr>
  )

}

export default LeaderboardTableHeader