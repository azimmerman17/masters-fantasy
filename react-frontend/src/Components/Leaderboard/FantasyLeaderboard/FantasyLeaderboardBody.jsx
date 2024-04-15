import { useState } from 'react';

import FantasyLeaderboardHeaders from '../../../assets/Files/FantasyLeaderboardHeaders'
import LeaderboardTableData from '../LeaderboardTableData';
import FantasyLeaderboardAccordionBody from './FantasyLeaderboardAccordionBody';


const FantasyLeaderboardBody = ({ player, round, lineup }) => {
  const [expand, setExpand] = useState(false)
  const { user_name } = player

  const rowData = FantasyLeaderboardHeaders.map(header => {
    return <LeaderboardTableData player={player} header={header} view={'fantasy'} round={round} key={`leaderboard-${user_name}-row-${header}`} />
  })

  return (
    <tbody key={`leaderboard-${user_name}-row`}>
      <tr data-toggle={expand ? 'expand': 'collapse'} data-target={`#${user_name}-accordian`} className="accordion-toggle" onClick={e => setExpand(!expand)}>
        {rowData}
      </tr>
      <tr>
        <td colSpan={FantasyLeaderboardHeaders.length} className={`hiddenRow${expand ? '': ' p-0'}`}>
          <div className={`accordian-body ${expand ? 'expand': 'collapse p-0'}`} id={`${user_name}-accordian`}>
            <FantasyLeaderboardAccordionBody player={player} round={round} lineup={lineup}/>
          </div>
        </td>
      </tr>
    </tbody>


  )

}

export default FantasyLeaderboardBody