import {  useContext } from 'react'

import { FantasyLeaderboard } from '../../../Contexts/FantasyLeaderboardContext'
import Login from '../../Login'

const FantasyLeaderboardView = ({}) => {
  const { fantasyLeaderboard, setFantasyLeaderboard } = useContext(FantasyLeaderboard)
  console.log(fantasyLeaderboard)

  //validation if the leaderboard should be shown
  if (!fantasyLeaderboard) return null
  else if (fantasyLeaderboard === 'Login Required') {
    return (
      <>
        <h4 className=' my-3 text-center'>Fantasy Leaderboard</h4>
        <Login />
      </>
    )
  } else {

  
  //Leaderboard Table


 return (
  <h6>FantasyLeaderboard</h6>
 ) 
  }
}

export default FantasyLeaderboardView