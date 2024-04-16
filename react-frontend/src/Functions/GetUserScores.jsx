const GetUserScores = (player1, player2, player3) => {
  let userScores = []

  const validateScore = (score) => {
    if (!score) return 99
    return score
  }

  for (let i = 0; i < 18; i++) {
    let player1Score = validateScore(player1[i])
    let player2Score = validateScore(player2[i])
    let player3Score = validateScore(player3[i])

    let userHoleSore = Math.min(player1Score, player2Score, player3Score)
    if (userHoleSore === 99) userScores.push(null)
    else userScores.push(userHoleSore)
  }

  return userScores
}

export default GetUserScores