const calcPlayerScore = (player) => {
  const { total, roundStatus, status } = player

  // checks the status code for golfer with no scores
  const checkStatus = () => {
    switch (status) {
      // DQ Player scores 99 - status code unknown
      case 'DQ':
        return 99
      // Withdrawn Player scores 98
      case 'W':
        return 98
      // Cut Player scores 97
      case 'C':
        return 97
    }
  }

  // Get round status status to determine calculate
  // 'Pre' - NOT PLAYED, check status
  if (roundStatus === 'Pre') checkStatus()
  // 'not-applicable' - Something happened mid round - check status
  else if (roundStatus === 'not-applicable') checkStatus()
  else return total
  return 0
}

module.exports = calcPlayerScore