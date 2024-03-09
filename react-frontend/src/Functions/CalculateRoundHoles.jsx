// Calculates the number of holes completed to display - add functionality for 18 holes completed - but players still on course

const CalculateRoundHoles = (holes_completed, roundNum) => {
  // this is for the overall players holes completed
  if (!roundNum) {
    if (holes_completed === 72) return 'F' 
    // additional validation for players still on course
    return holes_completed
  }
  // rounds are complete
  if (holes_completed >= 18 * roundNum) return 'F'
    // additional validation for players still on course

  return holes_completed - ((roundNum - 1) * 18)
}

export default CalculateRoundHoles