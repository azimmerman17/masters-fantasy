import DisplayTableHeader from "../../Functions/DisplayTableHeader"

const LeaderboardTableHeader = ({ headers }) => {
 
  return (
    <tr>
      {headers.map(item => {
        // logic on displaying the header
       return DisplayTableHeader(item)
      })}
    </tr>
  )

}

export default LeaderboardTableHeader