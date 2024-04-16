const CreateLeaderboardScoreArr = (rowName, scores, side) => {
  let arr = [rowName]
  let total = 0

  let start = 0
  if (side === 'in') start = 9
  let end = 18
  if (side === 'out') end = 9

  for (let i = start; i < end; i++) {
   arr.push(scores[i])
   total += scores[i]
  }
  arr.push(total)

  return arr
}

export default CreateLeaderboardScoreArr