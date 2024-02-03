const PlayerScorecardData = ({ scores, pars, data }) => {

  const scoreName = (par, holeScore) => {
    
    if (holeScore + par === 0) return ''

    if (par > 9) {
      if (holeScore < 0) return 'text-danger fw-bolder'
      else if (holeScore === 0) return 'text-success fw-bolder'
      else return 'text-dark fw-bolder'
    }
    
    holeScore = Math.min(holeScore, 2)
    holeScore = Math.max(holeScore, -2)

    switch (holeScore){
      case -2:
        return 'eagle-better text-danger'
      case -1:
        return 'birdie text-danger'
      case 0: 
        return 'par text-success'
      case 1:
        return 'bogey'
      case 2:
        return 'double-bogey-worse'
    }
  }

  return (
    <tr>
      {
        scores.map((score, i) => {
          return (
            <th key={`score-${score}-${data}-${i}`} className={`m-1 fw-bold text-center label-small scorecard-cell`}>
                <small className={`${scoreName(pars[i], score - pars[i])} text-center`}>{score}</small>
            </th>
          )
        })
      }
    </tr>
  )
}

export default PlayerScorecardData