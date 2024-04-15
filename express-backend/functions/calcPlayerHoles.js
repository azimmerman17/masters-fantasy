const calcPlayerHoles = (player) => {
  const { score, status } = player
  // golfer out of tounament 
  if (status === 'C' || status === 'W' || status === 'DQ') return -1

  hole_count = 0
  score.forEach(hole => {
    if (hole) hole_count +=1
  })

  return hole_count
}

module.exports = calcPlayerHoles