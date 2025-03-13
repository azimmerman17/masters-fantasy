import Container from 'react-bootstrap/Container'

const RulesSheet = () => {
  return (
    <Container fluid>
      <h3 className='text-center'>Official Fantasy Rules</h3>
      <h5>How to Enter</h5>
      <p className='mb-1'>To enter please create or sign in to your account and create a 6 player roster.   Anyone with an account can play, and it is free to sign up.</p>
      <hr />
      <h5>User Roster</h5>
      <p className='mb-1'>A roster must consist of 6 players invited to the current Master's Golf Tournament.  A roster will consist of the following:</p>
      <ul>
        <li>1 Past Champion: Any Player who has previously won the Master's Golf Tournament</li>
        <li>1 USA Golfer: Any player with a nationality of the USA</li>
        <li>1 International Golfer Any player with a nationality outside of the USA </li>
        <li>3 Wild Cards: Any player invited to the current  Master's Golf Tournament</li>
      </ul>
      <p className='mb-1'>Rosters will lock at the posted first tee time of the First Round, no adjustments will be made due to weather delays.</p>
      <p className='mb-1'> No substitutions will be allowed once a Roster is locked.</p>
      <small><sup>*</sup>Your competitors' rosters are not viewable at this time.</small>
      <hr />
      <h5>Daily Lineups</h5>
      <p className='mb-1'>Each day you will select 3 golfers to represent your team for the day, their scores will count towards your placing in the Fantasy Competition.</p>
      <p className='mb-1'>Lineups lock at the posted first tee time the selected round, no adjustments will be made due to weather delays.</p>
      <p className='mb-1'> No substitutions will be allowed once a Lineup is locked.</p>
      <small>All lineup changes will update for future rounds.</small>
      <small><sup>*</sup>Your competitors' lineups are not viewable at this time.</small>
      <hr />
      <h5>Scoring</h5>
      <h6>Official Score</h6>
      <p className='mb-1'>The official score will be calculated based on the best ball format for the players selected into your lineup.  In best ball, the lowest score on each hole determines your score posted for the hole. These scores are calculated in relation to par.</p>
      <h6>Aggregate Score</h6>
      <p className='mb-1'>Aggregate Scores will be used to break ties and are calculated by the total strokes taken by each golfer selected in your daily lineups.</p>
      <hr />
      <h5>Players that are DQ, WD, or Cut</h5>
      <p className='mb-1'>Some golfers will not finish the tournament on Sunday. If these golfers are present in your lineup, they will have no impact on your scores.</p>
      <p className='mb-1'>For Aggregate Scoring they will receive the following score:</p>
      {/* <ul>
        <li>DQ (Disqualified) - 99 strokes</li>
        <li>WD (Withdrawn) - 98 strokes</li>
        <li>Cut - 97 strokes</li>
      </ul> */}
      <hr />
      <h5>Adjustments to Scores</h5>
      <p className='mb-1'>At times, penalty strokes or disqualifications are incurred in between rounds.  Scores will be reviewed and adjusted to reflect the official scores of the Master's Golf Tournament, should this occur.</p>      
      <hr />
      <h5>Breaking of Ties</h5>
      <p className='mb-1'>Ties will be broken in the following order:</p>
      <ol>
        <li>Lowest Score for all 4 Rounds</li>
        <li>Fewest Holes Completed</li>
        <li>Lowest Stableford Score for all 4 Rounds</li>     
        <li>Lowest in Best Ball in Round 4</li>
        <li>Lowest Stableford Score in Round 4</li>
        <li>Lowest in Best Ball in Round 3</li>
        <li>Lowest Stableford Score in Round 3</li>
        <li>Lowest in Best Ball in Round 2</li>
        <li>Lowest Stableford Score in Round 2</li>
        <li>Lowest in Best Ball in Round 1</li>
        <li>Lowest Stableford Score in Round </li>
        <li>Tie is Accepted</li>
      </ol>
      <hr />
      <h5>Stableford Scoring</h5>
      <p>Stabelford Scoring will be used only to break ties, below are the point values assigned to each score.</p>
      <ul>
        <li>Double Eagle or better: 8 points</li>
        <li>Eagle: 5 points</li>
        <li>Birdie: 2 points</li>     
        <li>Par: 0 points</li>
        <li>Bogey: -1 points</li>
        <li>Double Bogey or worse: -3 points</li>
      </ul>
    </Container>
  )
}

export default RulesSheet