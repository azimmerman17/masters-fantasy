const GetUserScores = (player1, player2, player3, full) => {
  let userScores = []
  let outScore = 0
  let inScore = 0

  const validateScore = (score) => {
    if (!score) return 99
    return score
  }

  for (let i = 0; i < 18; i++) {
    let player1Score = validateScore(player1[i])
    let player2Score = validateScore(player2[i])
    let player3Score = validateScore(player3[i])

    let userHoleScore = Math.min(player1Score, player2Score, player3Score)
    // Push to array
    if (userHoleScore === 99) userHoleScore = null
    userScores.push(userHoleScore)
  }

  return userScores
}

export default GetUserScores