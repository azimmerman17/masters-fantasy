const organizeLineups = rows => {
  let lineupMap = new Map()
  rows.forEach(row => {
    const { user_id, user_name, round, player1, player2, player3 } = row
    // console.log(row)
    if (!lineupMap.get(user_id)) {
      lineupMap.set(user_id, {
        user_id,
        user_name,
        rounds: [{
          round,
          player1,
          player2,
          player3
        }]
      }) 
    } else {
      let user_info = lineupMap.get(user_id)
      user_info.rounds.push({
        round,
        player1,
        player2,
        player3
      })
    }
  });
  return lineupMap
}

module.exports = organizeLineups