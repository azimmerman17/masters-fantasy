const { mysqlPool } = require('../models/db')
const updateScoresFile = require('../middleware/updateScoresFile')
const filterPlayerLeaderboard = require('./filterPlayerLeaderboard')
const calcPlayerScore = require('./calcPlayerScore')
const calcHoleScore = require('./clacHoleScore')
const calcPlayerHoles = require('./calcPlayerHoles')

async function updateRoundScore(user_id, year, round, leaderboard) {
  // Fetch the Lineup from public."User_Lineups"
  const getLineups = `SELECT player1,
      player2,
      player3
    FROM \`major-fantasy-golf\`.User_Lineups
    WHERE year = ${year}
      AND user_id = ${user_id}
      AND round = ${round};`

  try {
    const [response, metadata] = await mysqlPool.query(getLineups)

    if (response.error) return response
    if (response.length < 1) return 'No Lineups'

    // Get the player ids - translate to the correct player on leaderboard - returns the round scores
    let player1 = filterPlayerLeaderboard(response[0]['player1'], leaderboard, round)
    let player2 = filterPlayerLeaderboard(response[0]['player2'], leaderboard, round)
    let player3 = filterPlayerLeaderboard(response[0]['player3'], leaderboard, round)

    // For each hole, get the lowest score - translate to vsPar - caluclated holes completed for the round
    let score = 0
    let holesCompleted = 0
    updateScoresFile.pars.forEach((par, i) => {
      let holeScores = []
      let holeScore = 0
      // calculate hole scores for each player
      let player1Score = calcHoleScore(player1, round, i)
      let player2Score = calcHoleScore(player2, round, i)
      let player3Score = calcHoleScore(player3, round, i)

      // Find the lowest score
      if (player1Score !== null ) holeScores.push(player1Score)
      if (player2Score !== null) holeScores.push(player2Score)
      if (player3Score !== null) holeScores.push(player3Score)

      if (holeScores.length > 0) {
        holeScore = Math.min(...holeScores)
        score += (holeScore - par)
        holesCompleted += 1
      }
    });

    // Sum the aggregate score for the round
    let player1Score = calcPlayerScore(player1) 
    let player2Score = calcPlayerScore(player2)
    let player3Score = calcPlayerScore(player3)
    
    let aggregateScore = player1Score + player2Score + player3Score

    // Calculate the holes_completed 
    let totalHolesCompleted = ((round -1) * 18) + holesCompleted

    // Calculate holes_completed display for leaderboard
    let holesDisplay
    let player1Holes = calcPlayerHoles(player1) 
    let player2Holes = calcPlayerHoles(player2) 
    let player3Holes = calcPlayerHoles(player3) 

    if ((player1Holes === 18  || player1Holes === -1 ) && (player2Holes === 18  || player2Holes === -1 ) && (player3Holes === 18  || player3Holes === -1 ) ) holesDisplay = 'F'
    else holesDisplay = Math.max(player1Holes, player2Holes, player3Holes)

    if (!holesDisplay) holesDisplay = 0

    // UPDATE STATEMENT FOR public."Fanstay_Scoring"
    let updateQuery = `UPDATE \`major-fantasy-golf\`.Fantasy_Scoring
      SET updated_at = NOW(),
        round${round} = ${score},
        round${round}_aggr = ${aggregateScore},
        holes_completed = ${totalHolesCompleted},
        holes_display = '${holesDisplay}',
        display_round = ${round}
      WHERE year = ${year}
        AND user_id = ${user_id}`

    const [updateResponse, updateMetadata] = await mysqlPool.query(updateQuery)
    if (updateResponse.error) return 'Error - scoring update Failed'
   return 'Done'

  } catch (error) {
    console.error(error)
    return error
  }  
}


module.exports = updateRoundScore