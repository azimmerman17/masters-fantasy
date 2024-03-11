const pool = require('../models/db')

const updateScoresFile = require('../middleware/updateScoresFile')
const filterPlayerLeaderboard = require('./filterPlayerLeaderboard')
const calcPlayerScore = require('./calcPlayerScore')
const calcHoleScore = require('./clacHoleScore')

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

  // Get the player ids - translate to the correct player on leaderboard - returns the round scores
  let player1 = filterPlayerLeaderboard(rows[0]['player1'], leaderboard, round)
  let player2 = filterPlayerLeaderboard(rows[0]['player2'], leaderboard, round)
  let player3 = filterPlayerLeaderboard(rows[0]['player3'], leaderboard, round)
  // console.log(player1, player2, player3)
  // console.log(updateScoresFile.pars)

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
  let player1Score = calcPlayerScore(player1, round) 
  let player2Score = calcPlayerScore(player2, round)
  let player3Score = calcPlayerScore(player3, round)
  
  let aggregateScore = player1Score + player2Score + player3Score

  // Calculate the holes_completed 
  let totalHolesCompleted = ((round -1) * 18) + holesCompleted

  // UPDATE STATEMENT FOR public."Fanstay_Scoring"
  console.log(score, holesCompleted, aggregateScore, totalHolesCompleted)


  } catch (error) {
    console.error(error)
    return error
  }  
}

module.exports = updateRoundScore