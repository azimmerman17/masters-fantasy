import { useContext } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

import { CurrentUser } from '../../../Contexts/CurrentUserContext';
import HandleDBTransaction from '../../../Functions/HandleDBTransaction';

const SelectionDropdown = ({ playerRoster, setRoundLineup, selectedPlayer, roundLineup, round, spot, lock, setShowLock }) => {
  const BASE_URL = import.meta.env.VITE_BASE_URL
  const {currentUser, setCurrentUser} = useContext(CurrentUser)
  const { player } = selectedPlayer
  const { Amateur, first_name, last_name } = player

  if (currentUser) {
    const dropdownItems = playerRoster.map(golfer => {
      const { player, stats } = golfer
      const { golfer_id , status } = stats 
      const { Amateur, first_name, last_name } = player
      const { user_id } = currentUser

      const handleClick = async (e, id) => {
        if (new Date() > lock) setShowLock(true)
        else {
          let path = BASE_URL + 'lineups/' + user_id + '/' + round
          let payload = {
            [lineupSpot]: id      
          }

          const handleUpdate = (id, lineupSpot) => {
            const newLineup = roundLineup.map((player, i) => {
              if (i === Number(lineupSpot[lineupSpot.length - 1]) - 1) {
                return Number(id)
              } else return player
            }) 

            setRoundLineup(newLineup)
          }
    
          try {
            await HandleDBTransaction(path, 'PUT', payload)
            handleUpdate(id, lineupSpot)
          } catch (error) {
            console.error(error)
          }
          // location.reload()
        }
      }
  
      return (
        <Dropdown.Item
          key={`lineup-round-${round}-spot-${spot}-${golfer_id}`}
          onClick={e => handleClick(e, golfer_id)}  // function to update db
          disabled={roundLineup.includes(Number(golfer_id)) || status === 'C' || status === 'W' }
          className={status === 'C' || status === 'W' ? 'text-decoration-line-through' : ''}
        >
          {first_name} {last_name}{Amateur ? ' (A)' : '' }
        </Dropdown.Item>

      )
    })

    return (
      <DropdownButton 
        id={`lineup-round-${round}-spot-${spot}`}
        title={`${first_name} ${last_name}${Amateur ? ' (A)' : '' }`}
        variant='white'
        size='lg'
      >
        {dropdownItems}
      </DropdownButton>
    )
  }
}

export default SelectionDropdown
