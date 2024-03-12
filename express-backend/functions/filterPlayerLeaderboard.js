const filterPlayerLeaderboard = (player_id, leaderboard, round) => {
  // get the golfers data from the leaderboard
  let golfer = leaderboard.filter(player => Number(player.id) === player_id)[0]
  // get scores array from the golfer object
  const { round1, round2, round3, round4, newStatus } = golfer

  // return the correct round
  if (round === 1) {
    return {
      score: round1.scores,
      total: round1.total,
      roundStatus:round1.total,
      newStatus
    }
  }
  else if (round === 2) {
    return {
      score: round2.scores,
      total: round2.total,
      roundStatus:round2.roundStatus,
      status: newStatus
    }
  }
  else if (round === 3) {
    return {
      score: round3.scores,
      total: round3.total,
      roundStatus:round3.roundStatus,
      status: newStatus
    }
  }
  else if (round === 4) {
    return {
      score: round4.scores,
      total: round4.total,
      roundStatus:round4.roundStatus,
      status: newStatus
    }
  }
}

module.exports = filterPlayerLeaderboard