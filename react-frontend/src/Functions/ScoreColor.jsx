// pass in a score value and returns bootstrap text-color class
const ScoreColor = (score) => {
  // change type to a number
  score = Number(score)

  if (score < 0) return 'text-danger'
  if (score === 0) return 'text-success'
  return 'text-black'
}

export default ScoreColor