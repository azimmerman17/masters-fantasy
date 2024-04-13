const calcPlayerHoles = (player) => {
  const { score } = player

  hole_count = 0
  score.forEach(hole => {
    if (hole) hole_count +=1
  });

  return hole_count
}

module.exports = calcPlayerHoles