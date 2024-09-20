import { useContext } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Alert from 'react-bootstrap/esm/Alert';

import { CurrentUser } from '../../../Contexts/CurrentUserContext';
import HandleDBTransaction from '../../../Functions/HandleDBTransaction';

const SelectionDropdown = ({ playersRoster, setRoundLineup, selectedPlayer, roundLineup, round, lineupSpot, lock, setShowLock }) => {
  console.log(lock)
  const BASE_URL = import.meta.env.VITE_BASE_URL
  const {currentUser, setCurrentUser} = useContext(CurrentUser)
  const {  Amateur, first_name, last_name, amateur  } = selectedPlayer

  if (currentUser) {
    const dropdownItems = playersRoster.map(player => {
      const { Amateur, first_name, last_name, amateur, id , status } = player
      const { user_id, roster } = currentUser
      const { year } = roster

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
          key={`lineup-round-${round}-spot-${lineupSpot}-${id}`}
          onClick={e => handleClick(e, id)}  // function to update db
          disabled={roundLineup.includes(Number(id)) || status === 'C' || status === 'W' }
        >
          {first_name} {last_name}{Amateur || amateur ? ' (A)' : '' }
        </Dropdown.Item>

      )
    })

    return (
      <DropdownButton 
        id={`lineup-round-${round}-spot-${lineupSpot}`}
        title={`${first_name} ${last_name}${Amateur || amateur ? ' (A)' : '' }`}
        variant='white'
        size='lg'
      >
        {dropdownItems}
      </DropdownButton>
    )
  }
}

export default SelectionDropdown
