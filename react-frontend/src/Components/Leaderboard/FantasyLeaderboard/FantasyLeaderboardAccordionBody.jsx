import { useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import ScoreColor from '../../../Functions/ScoreColor'
import FantasyLeaderboardAccordionContent from './FantasyLeaderboardAccordionContent';

const FantasyLeaderboardAccordionBody = ({ player, round, lineup }) => {
  let [roundDisplay, setRoundDisplay] = useState(round)
  const { round1, round2 ,round3, round4 } = player
  const { rounds } = lineup

  let scoreDisplay
  if (roundDisplay === 1) scoreDisplay = round1
  else if (roundDisplay === 2) scoreDisplay = round2
  else if (roundDisplay === 3) scoreDisplay = round3
  else if (roundDisplay === 4) scoreDisplay = round4


  return (
    <Container className='p-0' fluid>
      <Row>
        <Col>
          <DropdownButton
            key='end'
            id={`dropdown-button-drop-start`}
            drop='end'
            variant='success'
            title={`Round ${roundDisplay}`}
            size='sm'
          >
            <Dropdown.Item eventKey={1} onClick={(e)=> setRoundDisplay(1)}>Round 1</Dropdown.Item>
            <Dropdown.Item eventKey={2} onClick={(e)=> setRoundDisplay(2)}>Round 2</Dropdown.Item>
            <Dropdown.Item eventKey={3} onClick={(e)=> setRoundDisplay(3)}>Round 3</Dropdown.Item>
            <Dropdown.Item eventKey={4} onClick={(e)=> setRoundDisplay(4)}>Round 4</Dropdown.Item>
          </DropdownButton>   
        </Col>
        <Col>
          <h6 className='text-end fw-bolder m-1'>
            <span>Rd {roundDisplay}: </span>
            <span className={`${ScoreColor(scoreDisplay)}`}>{scoreDisplay}</span> 
          </h6>
        </Col>
      </Row>
      <FantasyLeaderboardAccordionContent lineup={rounds.filter(round => round.round === roundDisplay)[0]} player={player}/>

    </Container>
  ) 
}

export default FantasyLeaderboardAccordionBody