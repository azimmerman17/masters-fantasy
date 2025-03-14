require('dotenv').config()
const updateRoundScore = require('../functions/updateRoundScore')
// const updateScoresFile = require('../middleware/updateScoresFile')
const mysqlPool = require('../models/db')
 
async function updateScores(data, configData) {
  const { leaderboard } = data.data
  const { year, rnd } = configData

  // Fetch scoring data from public."Fanstay_Scoring"
  let fetchIDs = `SELECT user_id
  FROM \`major-fantasy-golf\`.Fantasy_Scoring
  WHERE year = ${year}`

  try {
    const [response, metadata] = await mysqlPool.query(fetchIDs)

    if (response.error) {
      return response.error
    } else if (response.length < 1) {
      console.log('no players - quit')
      return 'no players - quit'
    } else { 
      // For each record on public."Fanstay_Scoring" - update scorings for the round.
      response.forEach(async (row) => {
        // Update the score for the round
        await updateRoundScore(row['user_id'], year, rnd, leaderboard)
      })
    }
  } catch (error) {
    console.error(error)
    return error
  }
}

module.exports = updateScores