const calcHoleScore = (player, round, hole) => {
  const { score, scores, roundStatus, status } = player

  //check the round status
  // 'Pre' - round not started, don't include - 
  if (roundStatus === 'Pre') {
    return null}
  // 'not-applicable' - Something happened mid round - dont include
  if (roundStatus === 'not-applicable') return null

  // if round in progress or finished return the score
  if (scores) return scores[hole]
  return score[hole]
}

module.exports = calcHoleScore