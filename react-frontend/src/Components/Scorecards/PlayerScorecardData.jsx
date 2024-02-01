const PlayerScorecardData = ({ scores, pars, data }) => {

  const scoreName = (par, holeScore) => {
    holeScore = Math.min(holeScore, 2)
    holeScore = Math.max(holeScore, -2)

    if (par > 10 || typeof(par) == 'string') return ''

    switch (holeScore){
      case -2:
        return 'eagle-better'
      case -1:
        return 'birdie'
      case 0: 
        return 'par'
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
            <th key={`score-${score}-${data}-${i}`} className={`m-1 fw-bold text-center label-small ${score < pars[i] ? 'text-danger'  : `${score === pars[i] ? 'text-success'  : ''}`}`}>
                <small className={`${scoreName(pars[i], score - pars[i])} text-center`}>{score}</small>
            </th>
          )
        })
      }
    </tr>
  )
}

export default PlayerScorecardData