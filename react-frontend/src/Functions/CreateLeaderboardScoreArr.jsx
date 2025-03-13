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
   if (side === 'full' && i === 8) arr.push(total)
   if (side == 'full' && i === 17) arr.push(total - arr[10])
  }
  arr.push(total)

  return arr
}

export default CreateLeaderboardScoreArr