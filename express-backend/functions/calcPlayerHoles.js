const calcPlayerHoles = (player) => {
  const { score, newStatus } = player
  hole_count = 0

  // status of F means all 18 played
  if (newStatus[0] == 'F') return 18

  // count the number of holes with a score
  score.forEach(hole => {
    if (hole) hole_count +=1
  });

  return hole_count
}

module.exports = calcPlayerHoles