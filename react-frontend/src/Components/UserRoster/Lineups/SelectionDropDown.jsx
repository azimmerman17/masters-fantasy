import { useContext } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

import { CurrentUser } from '../../../Contexts/CurrentUserContext';
import HandleDBTransaction from '../../../Functions/HandleDBTransaction';
import BASE_URL from '../../../assets/Files/BASE_URL';

const SelectionDropdown = ({ playersRoster, selectedPlayer, roundLineup, round, lineupSpot }) => {
  const {currentUser, setCurrentUser} = useContext(CurrentUser)
  const { first_name, last_name } = selectedPlayer

  if (currentUser) {
    const dropdownItems = playersRoster.map(player => {
      const { first_name, last_name, id , status } = player
      const { user_id } = currentUser

      const handleClick = async (e, id) => {
        console.log('player_id', id, 'round', round, 'rosterspot', lineupSpot, 'user', user_id )
        let path = BASE_URL + 'lineups/' + user_id + '/' + round
        let payload = {
          [lineupSpot]: id      
        }
  
        try {
          let updateResponse = await HandleDBTransaction(path, 'PUT', payload)
        } catch (error) {
          console.error(error)
        }
        location.reload()
      }
  
      return (
        <Dropdown.Item
          key={`lineup-round-${round}-spot-${lineupSpot}-${id}`}
          onClick={e => handleClick(e, id)}  // function to update db
          disabled={roundLineup.includes(Number(id)) || status === 'C' || status === 'W' }
        >
          {first_name} {last_name}
        </Dropdown.Item>

      )
    })

    return (
      <DropdownButton 
        id={`lineup-round-${round}-spot-${lineupSpot}`}
        title={`${first_name} ${last_name}`}
        variant='white'
        size='lg'
      >
        {dropdownItems}
      </DropdownButton>
    )
  }
}

export default SelectionDropdown

// needs for PUT request - player_id, user_id, round, rosterspot