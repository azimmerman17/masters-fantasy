import { useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Container from 'react-bootstrap/Container';
import FantasyLeaderboardAccordionContent from './FantasyLeaderboardAccordionContent';

const FantasyLeaderboardAccordionBody = ({ player, round, lineup }) => {
  let [roundDisplay, setRoundDisplay] = useState(round)
  const { rounds } = lineup
  console.log(player)
  return (
    <Container className='p-0' fluid>
      <div className='p-0 d-flex align-items-end'>
      <DropdownButton
        key='end'
        id={`dropdown-button-drop-start`}
        drop='end'
        variant="success"
        title={`Round ${roundDisplay}`}
        size='sm'
      >
        <Dropdown.Item eventKey={1} onClick={(e)=> setRoundDisplay(1)}>Round 1</Dropdown.Item>
        <Dropdown.Item eventKey={2} onClick={(e)=> setRoundDisplay(2)}>Round 2</Dropdown.Item>
        <Dropdown.Item eventKey={3} onClick={(e)=> setRoundDisplay(3)}>Round 3</Dropdown.Item>
        <Dropdown.Item eventKey={4} onClick={(e)=> setRoundDisplay(4)}>Round 4</Dropdown.Item>
      </DropdownButton>   
      </div>
      <FantasyLeaderboardAccordionContent lineup={rounds.filter(round => round.round === roundDisplay)[0]} player={player}/>

    </Container>
  ) 
}

export default FantasyLeaderboardAccordionBody