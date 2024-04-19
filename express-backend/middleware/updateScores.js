require('dotenv').config()
const updateRoundScore = require('../functions/updateRoundScore')
const updateScoresFile = require('../middleware/updateScoresFile')
const { mysqlPool } = require('../models/db')

const year = (new Date().getFullYear())
 
async function updateScores() {

  // Fetch leaderboard data from env
  const leaderboard = updateScoresFile.scores

  // Get current round and pars
  const current_round = updateScoresFile.round

  // Fetch scoring data from public."Fanstay_Scoring"
  let fetchIDs = `SELECT user_id
  FROM \`major-fantasy-golf\`.Fantasy_Scoring
  WHERE year = ${year}`

  try {
    const [response, metadata] = await mysqlPool.query(fetchIDs)

    if (response.error) {
      updateScoresFile.process_active = 0
      return response.error
    } else if (response.length < 1) {
      updateScoresFile.process_active = 0
      console.log('no players - quit')
      return 'no players - quit'
    } else { 
      // For each record on public."Fanstay_Scoring" - update scorings for the round.
      response.forEach(async (row) => {
        // Update the score for the round
        await updateRoundScore(row['user_id'], year, current_round, leaderboard)
      })
    }
  } catch (error) {
    console.error(error)
    return error
  }
}

module.exports = updateScores