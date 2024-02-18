
import { PiArrowUpLight } from "react-icons/pi";            // <PiArrowUpLight />
import { PiArrowDownLight } from "react-icons/pi";          // <PiArrowDownLight />
import { PiArrowsHorizontalLight } from "react-icons/pi";   // <PiArrowsHorizontalLight />
import Image from 'react-bootstrap/Image';





const LeaderboardTableData = ({ player, header, view }) => {
  if (view === 'tournament') {
    const { id, amateur, countryCode,display_name, movement, newStatus, pos, round1, round2, round3, round4, teetime, thru, today,topar, total } = player

    switch (header) {
      case 'POS':
        if (newStatus === 'C') return <td className='text-center'>MC</td>
        else if (newStatus === 'W') return <td className='text-center'>WD</td>
        else return <td className='text-center'>{pos}</td>
      case 'move':
        if (window.innerWidth < 775) return null
        if (newStatus === 'C' || newStatus === 'W') return <td></td>
        else if (Number(movement) === 0) return <td className='text-center'><PiArrowsHorizontalLight /></td>
        else if (Number(movement) > 0) return <td className='text-success text-center'><PiArrowUpLight /> {movement}</td>
        else if (Number(movement) < 0) return <td className='text-danger text-center'><PiArrowDownLight /> {movement.substring(1)}</td>
        else return <td></td>
      case 'PLAYER':
        if (window.innerWidth < 775) return  <td className><a href={`/tournament/players/${id}`} className='text-decoration-none text-black fw-bolder ps-2'>{display_name} {amateur ? '(A)' : null }</a></td>
        else return <td><a href={`/tournament/players/${id}`} className='text-decoration-none text-black fw-bolder ps-2'><Image className='leaderboard-img' src={`https://images.masters.com/players/2023/240x240/${id}.jpg`} alt={id} roundedCircle /> {display_name} <Image src={`https://www.masters.com/assets/images/flags/${countryCode}_sm.gif`} alt={countryCode} className='leaderboard-flag'/> {amateur ? '(A)' : null }</a></td>
      case 'TOTAL':
        if (newStatus === 'C') return <td colSpan={3} className='text-center'>Missed Cut</td> 
        else if (newStatus === 'W') return <td colSpan={3} className='text-center'>Withdrawn</td> 
        else if (topar[0] === '-') return <td className='text-center fw-bold text-danger'>{topar}</td>
        else if (topar === 'E') return <td className='text-center fw-bold text-success'>{topar}</td>
        else return <td className='text-center fw-bold'>{topar}</td>
      case'THRU':
        if (newStatus === 'C' || newStatus === 'W') return null
        else if (thru === '') return <td colSpan={2} className='text-center'>{teetime}</td>
        else return <td className='text-center'>{thru}</td>
      case'TODAY':
        if ((newStatus === 'C' || newStatus === 'W')) return null
        else if (thru === '') return null
        else if (today[0] === '-') return <td className='text-center fw-bold text-danger'>{today}</td>
        else if (today === 'E') return <td className='text-center fw-bold text-success'>{today}</td>
        else return <td className='text-center fw-bold'>{today}</td>
      case'R1':
        if (window.innerWidth < 500) return null
         else return <td className='text-center'>{round1.total}</td>
      case 'R2':
        if (window.innerWidth < 500) return null
        else return <td className='text-center'>{round2.total}</td>      
      case'R3':
      if (window.innerWidth < 500) return null
      else return <td className='text-center'>{round3.total}</td>
      case'R4':
      if (window.innerWidth < 500) return null
      else return <td className='text-center'>{round4.total}</td>
      case'STROKES':
      if (window.innerWidth < 500) return null
      else return <td className='text-center'>{total}</td>
    }

  }

}

export default LeaderboardTableData