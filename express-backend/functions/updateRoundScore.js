const pool = require('../models/db')

async function updateRoundScore(user_id, year, round, leaderboard) {
  console.log(user_id, year, round)
  // Fetch the Lineup from public."User_Lineups"
  const getLineups = `SELECT A.player1,
      A.player2,
      A.player3
    FROM public."User_Lineups" A
    WHERE A.year = ${year}
      AND A.user_id = ${user_id}
      AND A.round = ${round};`


  try {
  const response = await pool.query(getLineups)
  const { rows, rowCount } = response
  if (response.error) return response
  if (rowCount < 1) return 'No Lineups'

  // Get the player ids
  player1 = rows[0]['player1']
  player2 = rows[0]['player2']
  player3 = rows[0]['player3']
  console.log(player1, player2, player3)





  } catch (error) {
    console.error(error)
    return error
  }  
}

module.exports = updateRoundScore