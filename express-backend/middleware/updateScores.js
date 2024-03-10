const axios = require('axios')

async function updateScores(state) {
// Get the master config file
const ConfigUrl = 'https://www.masters.com/en_US/scores/feeds/2023/scores.json'

try {
  
  const mastersConfig = await axios.get(ConfigUrl)
  const { data } = mastersConfig
  console.log(data)
} catch (error) {
  console.error(error)
}

// Fetch leaderboard data from Masters


// Get tournament state, round active/ inactive, tournament active/inactive, 

// if tournament inactive, no updates

// Get current round

// Fetch scoring data from public."Fanstay_Scoring"

// For each record on public."Fanstay_Scoring" - update scorings for the round.
// If round is live or Finsihed update current, if not yet started update previous

// Fetch the Lineup from public."User_Lineups"

// For each hole, get the lowest score - translate to vsPar

// Sum the aggregate score for the round

// Calculate the holes_completed 

// UPDATE STATEMENT FOR public."Fanstay_Scoring"

// set the resfresh interval/ clear the interval, depending on state - pass in the state for the next run

}

updateScores()

module.exports = updateScores