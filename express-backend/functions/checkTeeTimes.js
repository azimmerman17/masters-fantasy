const checkTeeTimes = (pairings)=> {
  const { round1, round2, round3, round4 } = pairings
  const rounds = [round1, round2, round3, round4]
  const teeTimes = []
  
  rounds.forEach((round, i) => {
    const { group } = round 
    group.forEach(time => {
      const { epoch } = time
      if (!teeTimes[i])  teeTimes[i] = epoch
      if (epoch < teeTimes[i]) teeTimes[i] = epoch
    })
  })
  
  return teeTimes
}

module.exports = checkTeeTimes