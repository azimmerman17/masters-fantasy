
import { PiArrowUpLight } from 'react-icons/pi';            // <PiArrowUpLight />
import { PiArrowDownLight } from 'react-icons/pi';          // <PiArrowDownLight />
import { PiArrowsHorizontalLight } from 'react-icons/pi';   // <PiArrowsHorizontalLight />
import { HiMiniChevronUpDown } from 'react-icons/hi2'       // <HiMiniChevronUpDown />
import Image from 'react-bootstrap/Image';

import ScoreColor from '../../Functions/ScoreColor';

const LeaderboardTableData = ({ player, header, view, round }) => {
  if (view === 'tournament') {
    const { id, amateur, countryCode, display_name, movement, newStatus, pos, round1, round2, round3, round4, teetime, thru, today, topar, total } = player

    switch (header) {
      case 'POS':
        if (newStatus === 'C') return <td className='text-center' style={{fontSize: '14px'}}>MC</td>
        else if (newStatus === 'W') return <td className='text-center' style={{fontSize: '14px'}}>WD</td>
        else return <td className='text-center' style={{fontSize: '14px'}}>{pos}</td>
      case 'move':
        if (window.innerWidth < 768) return null
        if (newStatus === 'C' || newStatus === 'W') return <td></td>
        else if (Number(movement) === 0) return <td className='text-center' style={{fontSize: '14px'}}><PiArrowsHorizontalLight /></td>
        else if (Number(movement) > 0) return <td className='text-success text-center' style={{fontSize: '14px'}}><PiArrowUpLight /> {movement}</td>
        else if (Number(movement) < 0) return <td className='text-danger text-center' style={{fontSize: '14px'}}><PiArrowDownLight /> {movement.substring(1)}</td>
        else return <td></td>
      case 'PLAYER':
        if (window.innerWidth < 775) return  <td  style={{fontSize: '14px'}}><a href={`/tournament/players/${id}`} className='text-decoration-none text-black fw-bold ps-2'>{display_name} {amateur ? '(A)' : null }</a></td>
        else return <td style={{fontSize: '14px'}}><a href={`/tournament/players/${id}`} className='text-decoration-none text-black fw-bolder ps-2'><Image className='leaderboard-img' src={`https://images.masters.com/players/${(new Date()).getFullYear()}/240x240/${id}.jpg`} alt={id} roundedCircle /> {display_name} <Image src={`https://www.masters.com/assets/images/flags/${countryCode}_sm.gif`} alt={countryCode} className='leaderboard-flag'/> {amateur ? '(A)' : null }</a></td>
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
        if (window.innerWidth < 768) return null
         else return <td className='text-center' style={{fontSize: '14px'}}>{round1.total}</td>
      case 'R2':
        if (window.innerWidth < 768) return null
        else return <td className='text-center' style={{fontSize: '14px'}}>{round2.total}</td>      
      case'R3':
      if (window.innerWidth < 768) return null
      else return <td className='text-center' style={{fontSize: '14px'}}>{round3.total}</td>
      case'R4':
      if (window.innerWidth < 768) return null
      else return <td className='text-center' style={{fontSize: '14px'}}>{round4.total}</td>
      case'STROKES':
      if (window.innerWidth < 768) return null
      else return <td className='text-center' style={{fontSize: '14px'}}>{total}</td>
    }
  }
  if (view === 'fantasy') {
    const { user_name, seq_num, holes_display, display_round, round1, round2, round3, round4, holes_completed, total, round1_sf, round2_sf, round3_sf,round4_sf, total_sf, round1_aggr, round2_aggr, round3_aggr,round4_aggr, total_aggr } = player
    switch (header) {
      case '':
        return <td><HiMiniChevronUpDown /></td>
      case 'POS':
        // need function to determine POS
        return <td className='text-center' style={{fontSize: '14px'}}>{seq_num}</td>
      case 'PLAYER':
        return <td style={{fontSize: '14px'}}>{user_name}</td>
      case 'TOTAL':
        return <td className={`text-center fw-bold ${ScoreColor(total)}`} style={{fontSize: '14px'}}>{total}</td>
      case 'THRU':
        let thru
        if (round > display_round) thru = 0
        if (round < display_round) thru = 'F'
        else thru = holes_display

        return <td className='text-center' style={{fontSize: '14px'}}>{thru}</td>
      case 'TODAY':
        let today

        if (round === 1) today = round1
        else if (round === 2) today = round2
        else if (round === 3) today = round3
        else today = round4

        return <td className={`text-center fw-bold ${ScoreColor(today)}`} style={{fontSize: '14px'}}>{today === 0 ? 'E' : today}</td>
      case 'R1':
        if (window.innerWidth < 768) return null
        else if (round < 1) return <td></td>
        else return <td className={`text-center ${ScoreColor(round1)}`} style={{fontSize: '14px'}}>{round1 === 0 ? 'E' : round1}</td>
      case 'R2':
        if (window.innerWidth < 768) return null
        else if (round < 2) return <td></td>
        else return <td className={`text-center ${ScoreColor(round2)}`} style={{fontSize: '14px'}}>{round2 === 0 ? 'E' : round2}</td>
      case 'R3':
        if (window.innerWidth < 768) return null
        else if (round < 3) return <td></td>
        else return <td className={`text-center ${ScoreColor(round3)}`} style={{fontSize: '14px'}}>{round3 === 0 ? 'E' : round3}</td>
      case 'R4':
        if (window.innerWidth < 768) return null
        else if (round < 4) return <td></td>
        else return <td className={`text-center ${ScoreColor(round4)}`} style={{fontSize: '14px'}}>{round4 === 0 ? 'E' : round4}</td>
      case 'SF':
       // if (window.innerWidth < 1200) return null
        //else
         if (round < 1) return <td></td>
        else return <td className={`text-center ${ScoreColor(total_sf)}`} style={{fontSize: '14px'}}>{total_sf}</td>
      case 'R1 SF':
        if (window.innerWidth < 1200) return null
        else if (round < 1) return <td></td>
        else return <td className={`text-center ${ScoreColor(round1_sf)}`} style={{fontSize: '14px'}}>{round1_sf}</td>
      case 'R2 SF':
        if (window.innerWidth < 1200) return null
        else if (round < 2) return <td></td>
        else return <td className={`text-center ${ScoreColor(round2_sf)}`} style={{fontSize: '14px'}}>{round2_sf}</td>
      case 'R3 SF':
        if (window.innerWidth < 1200) return null
        else if (round < 3) return <td></td>
        else return <td className={`text-center ${ScoreColor(round3_sf)}`} style={{fontSize: '14px'}}>{round3_sf}</td>
      case 'R4 SF':
        if (window.innerWidth < 1200) return null
        else if (round < 3) return <td></td>
        else return <td className={`text-center ${ScoreColor(round4_sf)}`} style={{fontSize: '14px'}}>{round4_sf}</td>
        case 'TOTAL AGGR':
          if (window.innerWidth < 1200) return null
          else if (total_aggr === 0) return <td></td>
          else return <td className={`text-center ${ScoreColor(total_aggr)}`} style={{fontSize: '14px'}}>{total_aggr}</td>
        case 'R1 AGGR':
          if (window.innerWidth < 1200) return null
          else if (round1_aggr === 0) return <td></td>
          else return <td className={`text-center ${ScoreColor(round1_aggr)}`} style={{fontSize: '14px'}}>{round1_aggr}</td>
        case 'R2 AGGR':
          if (window.innerWidth < 1200) return null
          else if (round2_aggr === 0) return <td></td>
          else return <td className={`text-center ${ScoreColor(round2_aggr)}`} style={{fontSize: '14px'}}>{round2_aggr}</td>
        case 'R3 AGGR':
          if (window.innerWidth < 1200) return null
          else if (round3_aggr === 0) return <td></td>
          else return <td className={`text-center ${ScoreColor(round3_aggr)}`} style={{fontSize: '14px'}}>{round3_aggr}</td>
        case 'R4 AGGR':
          if (window.innerWidth < 1200) return null
          else if (round4_aggr === 0) return <td></td>
          else return <td className={`text-center ${ScoreColor(round4_aggr)}`} style={{fontSize: '14px'}}>{round4_aggr}</td>
      }
  }
}

export default LeaderboardTableData