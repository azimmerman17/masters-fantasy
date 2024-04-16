const GetPlayerData = (id, leaderboard) => {
  return leaderboard.filter(golfer => golfer.id == id)[0]

}
export default GetPlayerData