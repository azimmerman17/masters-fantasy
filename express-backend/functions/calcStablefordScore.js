const calcStablefordScore = (score) => {
  let stablefordScore = 0
  if (score <= -3) stablefordScore = 8            //  Double Eagle or better
  else if (score === -2) stablefordScore = 5      //  Eagle
  else if (score === -1) stablefordScore = 2      //  Birdie
  else if (score === 0) stablefordScore = 0       //  Par
  else if (score === 1) stablefordScore = -1      //  Bogey
  else stablefordScore = -3                       //  Double Bogey or worse

  return stablefordScore
}

module.exports = calcStablefordScore