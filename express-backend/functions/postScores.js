const { mysqlPool, pgPool } = require('../models/db')

const postScores = async (posted, year) => {
// check to see if round is not posted
if (posted) return 'Tournament already posted'

// get the leaderboard and user data
const fetchQuery = `Select A.user_id,
  A.seq_num,
  (A.round1 + A.round2 + A.round3 + A.round4) as score,
  B.appearances,
  B.wins,
  B.best_finish, 
  B.low_score
  FROM \`major-fantasy-golf\`.Fantasy_Scoring A, \`major-fantasy-golf\`.User_Data B 
  WHERE A.user_id = B.user_id
	  AND A.year = ${year}
    AND seq_num IS NOT NULL`

  // run fetch query
  let data
  try {
    const [response, resMetadata] = await mysqlPool.query(fetchQuery)
    data = response

  } catch (error) {
    console.error(error)
    return false
  }

  //begin update query
  let update_query = `INSERT INTO \`major-fantasy-golf\`.User_Data (user_id, appearances, wins, best_finish, low_score, updated_at)
  VALUES`

// loop through each user and check for updates
  data.forEach((id, i) => {
    
    // update logic best finish
    let best_finish =  id.best_finish
    let best_tie_ind = false
    let best_finish_pos = null

    if (!best_finish) best_finish = id.seq_num 
    else {    
      if (id.best_finish.substring(0,1) === 'T') best_tie_ind = true
      if (best_tie_ind) best_finish_pos = Number(id.best_finish.substring(1))
      else best_finish_pos = Number(id.best_finish)
    } 

    //current finish
    let current_finish =  id.seq_num
    let current_tie_ind = false
    let current_finish_pos = null
    
    if (current_finish.substring(0,1) === 'T') current_tie_ind = true
    if (current_tie_ind) current_finish_pos = Number(id.seq_num.substring(1))
    else current_finish_pos = Number(id.seq_num)

    // find low position
    if (current_finish_pos < best_finish_pos) best_finish = current_finish
    // current === best
    else if (current_finish_pos === best_finish_pos) {
      if (current_tie_ind && best_tie_ind) best_finish = `T${current_finish_pos}`
      else best_finish = `${current_finish_pos}`
    } 

    // add to query
    update_query = `${update_query}${i === 0 ? ' ' : ',\n'}(${id.user_id}, ${id.appearances += 1}, ${id.seq_num === '1' ? id.wins += 1 : id.wins}, '${best_finish}', ${Math.min(id.low_score, id.score)}, NOW())`
  })

  // add duplicate clause
  update_query = `${update_query}
    ON DUPLICATE KEY
    UPDATE user_id=VALUES(user_id),
      appearances=VALUES(appearances),
      wins=VALUES(wins),
      best_finish=VALUES(best_finish),
      low_score=VALUES(low_score),
      updated_at=VALUES(updated_at);`
  
  //mark tournament as posted
  // let config_update = `UPDATE \`major-fantasy-golf\`.Fantasy_Config
  // SET updated_at = NOW(),
  // posted = true
  // WHERE year = ${year}`
  
  // send to db
  try {
    await mysqlPool.query(update_query)
    // await mysqlPool.query(config_update) 
    return true
  } catch (error) {
    console.error(error)
    return false
  }
}

module.exports = postScores