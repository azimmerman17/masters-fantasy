const PlayerScorecardHeaders = ({ headers, data }) => {

  return (
    <tr>
      {
        headers.map((header, i) => {
          return <th key={`header-${header}-${data}-${i}`} className='bg-success text-white text-center label-small scorecard-cell'>{header}</th>
        })
      }
    </tr>
  )
}

export default PlayerScorecardHeaders