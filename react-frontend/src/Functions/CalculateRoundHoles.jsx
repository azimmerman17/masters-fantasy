// Calculates the number of holes completed to display 
const CalculateRoundHoles = (holes_completed, roundNum, players) => {
  console.log(18 * roundNum)
  // check if golfers still on course

    let roundStatus = 'F'
    players.forEach(player => {
      const { status } = player
      if (status !== 'F') {
        console.log('init')
        roundStatus = 18
      }
    })

    console.log(roundStatus)


  // Checks for overall event
  if (!roundNum) {
    // All holes completed check for players on the course
    if (holes_completed === 72) return roundStatus
    return holes_completed
  }
  // Checks for individual rounds
  // rounds are complete
  if (holes_completed > 18 * roundNum) return 'F'
   // All holes completed check for players on the course
  if (holes_completed == 18 * roundNum) return roundStatus
  
  return holes_completed - ((roundNum -1) * 18)
}

export default CalculateRoundHoles