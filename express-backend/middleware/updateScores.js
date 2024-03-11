require('dotenv').config()
const updateRoundScore = require('../functions/updateRoundScore')
const updateScoresFile = require('../middleware/updateScoresFile')
const pool = require('../models/db')
 
async function updateScores() {
  //  Derive the date
  // const year = (new Date().getFullYear())
  const year = 2023
  // Fetch leaderboard data from env
  const leaderboard = updateScoresFile.scores

  // if empty - clear the interval

  // Get current round and pars
  const current_round = updateScoresFile.round

  // Fetch scoring data from public."Fanstay_Scoring"
  let fetchScores = `SELECT A.user_id
  FROM public."Fantasy_Scoring" A
  WHERE year = ${year}`

  try {
    const response = await pool.query(fetchScores)
    
    if (response.error) {
      updateScoresFile.process_active = 0
      return response.error
    } else if (response.rows > 1) {
      updateScoresFile.process_active = 0
      console.log('no players - quit')
      return 'no players - quit'
    } else {
      const { rows } = response  
      // For each record on public."Fanstay_Scoring" - update scorings for the round.
      rows.forEach(async (row) => {
        // Update the score for the round
        await updateRoundScore(row['user_id'], year, current_round, leaderboard)
      })
    }
  } catch (error) {
    console.error(error)
    return error
  }
}

// Clear interval at the top

module.exports = updateScores