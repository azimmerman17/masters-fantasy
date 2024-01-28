import LeaderboardHeaders from "../../assets/Files/LeaderboardHeaders"


const LeaderboardTableHeader = () => {
 
  return (
    <tr>
      {LeaderboardHeaders.map(item => {
        return(
        <th key={`header-${item}`} className='text-center fs-6'>
          {item === 'move' ? null :  item}
        </th>
        )
      })}
    </tr>
  )

}

export default LeaderboardTableHeader