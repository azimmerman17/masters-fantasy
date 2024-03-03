import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

const SelectionDropdown = ({ playersRoster, selectedPlayer, roundLineup, round }) => {
  const { first_name, last_name } = selectedPlayer

  const dropdownItems = playersRoster.map(player => {
    const { first_name, last_name, id , status } = player

    return (
      <Dropdown.Item
        onClick={e => console.log(e)}  // function to update db
        disabled={roundLineup.includes(Number(id)) || status === 'C' || status === 'W' }
      >
        {first_name} {last_name}
      </Dropdown.Item>

    )
  })


  return (
    <DropdownButton 
      id={`lineup-round-${round}-spot-`}
      title={`${first_name} ${last_name}`}
      variant='white'
      size='lg'
    >
      {dropdownItems}
    </DropdownButton>
  )

}

export default SelectionDropdown

// needs for PUT request - player_id, user_id, round, rosterspot