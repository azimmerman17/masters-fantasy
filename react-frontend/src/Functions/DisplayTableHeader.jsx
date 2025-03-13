const DisplayTableHeader = (item) => {
  // X-Small	None	<576px
  // Small	sm	≥576px
  // Medium	md	≥768px
  // Large	lg	≥992px
  // Extra large	xl	≥1200px
  // Extra extra large	xxl	≥1400px
  switch (item) {
    case 'move':
      if (window.innerWidth < 768) return null
    case 'TOTAL':
      if (window.innerWidth < 768) item = 'TOT'
      return (
        <th key={`header-${item}`} className='text-center leaderboard-header' style={{fontSize: '14px'}}>
          {item}
        </th>
      )
    case 'R1':
      if (window.innerWidth < 768) return null
    case 'R2':
      if (window.innerWidth < 768) return null
    case 'R3':
      if (window.innerWidth < 768) return null
    case 'R4':
      if (window.innerWidth < 768) return null
    case 'STROKES':
      if (window.innerWidth < 768) return null
      return (
        <th key={`header-${item}`} className='text-center leaderboard-header' style={{fontSize: '14px'}}>
          {item}
        </th>
      )
    case 'TOTAL AGGR':
      if (window.innerWidth < 1200) return null
    case 'R1 AGGR':
      if (window.innerWidth < 1200) return null
    case 'R2 AGGR':
      if (window.innerWidth < 1200) return null
    case 'R3 AGGR':
      if (window.innerWidth < 1200) return null
    case 'R4 AGGR':
      if (window.innerWidth < 1200) return null
    case 'R1 SF':
      if (window.innerWidth < 1200) return null
    case 'R2 SF':
      if (window.innerWidth < 1200) return null
    case 'R3 SF':
      if (window.innerWidth < 1200) return null
    case 'R4 SF':
      if (window.innerWidth < 1200) return null
    default:
  }

  // 'POS', 'PLAYER', 'THRU', 'TODAY' - No changes needed
  return (
    <th key={`header-${item}`} className='text-center leaderboard-header' style={item ==='STROKES' || item === 'TOT' || item === 'TOTAL' ? {fontSize: '14px'} : null}>
      {item}
    </th>
    )
      
}

export default DisplayTableHeader