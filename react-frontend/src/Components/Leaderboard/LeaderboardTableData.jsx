
import { PiArrowUpLight } from "react-icons/pi";            // <PiArrowUpLight />
import { PiArrowDownLight } from "react-icons/pi";          // <PiArrowDownLight />
import { PiArrowsHorizontalLight } from "react-icons/pi";   // <PiArrowsHorizontalLight />
import Image from 'react-bootstrap/Image';





const LeaderboardTableData = ({ player, header, view }) => {
  if (view === 'tournament') {
    const { id, amateur, countryCode,display_name, movement, newStatus, pos, round1, round2, round3, round4, teetime, thru, today,topar, total } = player

    switch (header) {
      case 'POS':
        if (newStatus === 'C') return <td className='text-center' style={{fontSize: '14px'}}>MC</td>
        else if (newStatus === 'W') return <td className='text-center' style={{fontSize: '14px'}}>WD</td>
        else return <td className='text-center' style={{fontSize: '14px'}}>{pos}</td>
      case 'move':
        if (window.innerWidth < 775) return null
        if (newStatus === 'C' || newStatus === 'W') return <td></td>
        else if (Number(movement) === 0) return <td className='text-center' style={{fontSize: '14px'}}><PiArrowsHorizontalLight /></td>
        else if (Number(movement) > 0) return <td className='text-success text-center' style={{fontSize: '14px'}}><PiArrowUpLight /> {movement}</td>
        else if (Number(movement) < 0) return <td className='text-danger text-center' style={{fontSize: '14px'}}><PiArrowDownLight /> {movement.substring(1)}</td>
        else return <td></td>
      case 'PLAYER':
        if (window.innerWidth < 775) return  <td  style={{fontSize: '14px'}}><a href={`/tournament/players/${id}`} className='text-decoration-none text-black fw-bold ps-2'>{display_name} {amateur ? '(A)' : null }</a></td>
        else return <td  style={{fontSize: '14px'}}><a href={`/tournament/players/${id}`} className='text-decoration-none text-black fw-bolder ps-2'><Image className='leaderboard-img' src={`https://images.masters.com/players/2023/240x240/${id}.jpg`} alt={id} roundedCircle /> {display_name} <Image src={`https://www.masters.com/assets/images/flags/${countryCode}_sm.gif`} alt={countryCode} className='leaderboard-flag'/> {amateur ? '(A)' : null }</a></td>
      case 'TOTAL':
        if (newStatus === 'C') return <td colSpan={3} className='text-center' style={{fontSize: '14px'}}>Missed Cut</td> 
        else if (newStatus === 'W') return <td colSpan={3} className='text-center' style={{fontSize: '14px'}}>Withdrawn</td> 
        else if (topar[0] === '-') return <td className='text-center fw-bold text-danger' style={{fontSize: '14px'}}>{topar}</td>
        else if (topar === 'E') return <td className='text-center fw-bold text-success' style={{fontSize: '14px'}}>{topar}</td>
        else return <td className='text-center fw-bold' style={{fontSize: '14px'}}>{topar}</td>
      case'THRU':
        if (newStatus === 'C' || newStatus === 'W') return null
        else if (thru === '') return <td colSpan={2} className='text-center' style={{fontSize: '14px'}}>{teetime}</td>
        else return <td className='text-center' style={{fontSize: '14px'}}>{thru}</td>
      case'TODAY':
        if ((newStatus === 'C' || newStatus === 'W')) return null
        else if (thru === '') return null
        else if (today[0] === '-') return <td className='text-center fw-bold text-danger' style={{fontSize: '14px'}}>{today}</td>
        else if (today === 'E') return <td className='text-center fw-bold text-success' style={{fontSize: '14px'}}>{today}</td>
        else return <td className='text-center fw-bold' style={{fontSize: '14px'}}>{today}</td>
      case'R1':
        if (window.innerWidth < 500) return null
         else return <td className='text-center' style={{fontSize: '14px'}}>{round1.total}</td>
      case 'R2':
        if (window.innerWidth < 500) return null
        else return <td className='text-center' style={{fontSize: '14px'}}>{round2.total}</td>      
      case'R3':
      if (window.innerWidth < 500) return null
      else return <td className='text-center' style={{fontSize: '14px'}}>{round3.total}</td>
      case'R4':
      if (window.innerWidth < 500) return null
      else return <td className='text-center' style={{fontSize: '14px'}}>{round4.total}</td>
      case'STROKES':
      if (window.innerWidth < 500) return null
      else return <td className='text-center' style={{fontSize: '14px'}}>{total}</td>
    }

  }

}

export default LeaderboardTableData