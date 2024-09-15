const router = require('express').Router()
require('dotenv').config()

const organizeLineups = require('../functions/organizeLineups')
const updateSeqNum = require('../functions/updateSeqNum')
const updateScores = require('../middleware/updateScores')
const updateScoresFile = require('../middleware/updateScoresFile')
const { mysqlPool, pgPool } = require('../models/db')

//  Derive the date
const year = (new Date().getFullYear())

// GET
// Get leaderboard for entire field
router.get('/', async (req, res) => {

  const getScores = `SELECT A.user_name,
      B.holes_completed,
      B.seq_num,
      B.holes_display,
      B.display_round,
      (B.round1 + B.round2 + B.round3 + B.round4) as "total",
      B.round1,
      B.round2,
      B.round3,
      B.round4,      
      (B.round1_aggr + B.round2_aggr + B.round3_aggr + B.round4_aggr) as "total_aggr",
      B.round1_aggr,
      B.round2_aggr, 
      B.round3_aggr,
      B.round4_aggr,
      (B.round1_sf + B.round2_sf + B.round3_sf + B.round4_sf) as "total_sf",
      B.round1_sf,
      B.round2_sf, 
      B.round3_sf,
      B.round4_sf  
    FROM \`major-fantasy-golf\`.Users A, \`major-fantasy-golf\`.Fantasy_Scoring B
    WHERE A.user_id = B.user_id
      AND year = ${year}
    ORDER BY 6, 2 desc, 16 asc, 10, 9, 8, 7, 11 asc, 15 asc, 14 asc, 13 asc, 12 asc;`

    const getLineups = `SELECT 
        A.user_id, 
        A.user_name, 
        B.round,B.player1, 
        B.player2, 
        B.player3
      FROM  \`major-fantasy-golf\`.Users A, \`major-fantasy-golf\`.User_Lineups B
      WHERE A.user_id = B.user_id
        And B.year =${year}
      ORDER BY B.user_id, B.round`

  try {
    const [response, resMetadata] = await mysqlPool.query(getScores)
    const [lineupRespone, lineupMetadata] = await mysqlPool.query(getLineups)
  
    if (response.error || lineupRespone.error) res.status(500).send('error')
    else {
      // clean the data
      let leaderboard = response
      let lineupsMap = organizeLineups(lineupRespone)
      let lineups = []
      // console.log({leaderboard, lineups})
      lineupsMap.forEach(user => lineups.push(user))
      

      // console.log(leaderboard, lineups)
      res.status(200).send({leaderboard, lineups})
    }
  } catch (error) {
    console.error(error)
    res.status(500).send(error)
  }
})

// GET - Scores for a specific user
router.get('/:id', async (req, res) => {
  const { id } = req.params

  const getScores = `SELECT A.user_name,
      B.holes_completed,
      B.seq_num,
      B.holes_display,
      B.display_round,
      (B.round1 + B.round2 + B.round3 + B.round4) as "total",
      B.round1,
      B.round2,
      B.round3,
      B.round4,      
      (B.round1_aggr + B.round2_aggr + B.round3_aggr + B.round4_aggr) as "total_aggr",
      B.round1_aggr,
      B.round2_aggr, 
      B.round3_aggr,
      B.round4_aggr 
    FROM \`major-fantasy-golf\`.Users A, \`major-fantasy-golf\`.Fantasy_Scoring B
    WHERE A.user_id = B.user_id
      AND year = ${year}
      AND A.user_id = ${id}
    ORDER BY 6, 2 desc, 10, 9, 8, 7, 11 asc, 15 asc, 14 asc, 13 asc, 12 asc;`

  try {
    const [response, metadata] = await mysqlPool.query(getScores)

    if (response.error) res.status(500).send({response})
    else {
      // clean the data
      res.status(200).send(response)
    }
  } catch (error) {
    console.error(error)
    res.status(500).send(error)
  }
})

// POST
// receive scores from Masters and Frontend
router.post('/sendscores', async (req, res) => {
  const { data } = req.body
  try {

    const { currentRound, statusRound, player, pars, wallClockTime } = data
    const { round1, round2, round3, round4 } = pars
    
    // get 10 and 60 minutes proir to now - interval for updating the leaderboard
    let time = new Date()
    let timeMinus10 = time.setMinutes(time.getMinutes() - 10)
    let timeMinus60 = time.setMinutes(time.getMinutes() - 60)

    let round 
    // check for active round
    for (let i = 0; i < currentRound.length; i++) {
      if (currentRound[i] === '1') {
        updateScoresFile.round = i + 1
        round = i + 1
        break
      }
    }

    // Do not uudate if Tournament is inative
    // if (((statusRound[round - 1] === 'X' || statusRound[round - 1] === 'F') && new Date(wallClockTime) < timeMinus60 )  || statusRound[0] === 'N' ) {
    //   console.log('Tournament not active - No update')
    //   res.status(202).send('Tournament not active')
    // }
    // else if (timeMinus10 < updateScoresFile.lastUpdate) {
    //   console.log('<10 minutes since last update')
    //   res.status(202).send('<10 minutes since last update')
    // } else {


      // update the player and par list file
      updateScoresFile.scores = player
      if (round === 1) updateScoresFile.pars = round1
      else if (round === 2) updateScoresFile.pars = round2
      else if (round === 3) updateScoresFile.pars = round3
      else if (round === 4) updateScoresFile.pars = round4

      updateScoresFile.process_active = 1
      console.log('update scores')
      // res.status(202).send('No data sent')
      res.redirect(307, '/scoring/updatescores') 
    // }
  } catch (error) {
      console.error(error)
      res.status(202).send('No data sent')
  }
})

router.post('/updatescores', async (req, res) => {
  try {
    await updateScores()
    console.log('Scores Updated')
    updateScoresFile.lastUpdate = new Date()
    await updateSeqNum()
    console.log('SeqNum updated')
    res.status(200).send('Done')
  } catch (error) {
    console.error(error)
    res.status(500).send('Error')
  }

})


// create new scoring record
router.post('/new', async (req, res) => {
  // pass in user_id
  // derive year
  const { user_id } = req.body
  if (!user_id) res.status(400).send({msg: 'Unable to add scoring record, missing user_id'})
  else {
    // check if record exists
    let validateNew = `Select 'X' FROM \`major-fantasy-golf\`.Fantasy_Scoring
      WHERE year = ${year} 
        AND user_id = ${user_id}};`
  
    try {
      const [validateResponse, metadata] = await mysqlPool.query(validateNew) 
      if (validateResponse.error) res.status(500).send({msg: 'scoring record addition failled'})
      else if (validateResponse.length > 0) res.status(400).send({msg: 'scoring record already exists'})
      else {
        // create scoring record
        let insertScoringQuery = `INSERT INTO \`major-fantasy-golf\`.Fantasy_Scoring (user_id, year, created_at, updated_at)
          VALUES (${user_id}, ${year}, NOW(), NOW());`

        const [response, insertMetadata] = await mysqlPool.query(insertScoringQuery)
        if (response.error) res.status(500).send({msg: 'scoring record addition failled'})
        else res.status(201).send({msg: 'Sucess'})
      }
    } catch (error) {
      console.error(error)
      res.status(500).send({msg: 'scoring record addition failled'})
    }
  }
})


// PUT
// Update user scores 
router.put('/:id', async (req, res) => {
  const { id } = req.params
  const { holes_completed, round1, round2, round3, round4, round1_aggr, round2_aggr, round3_aggr, round4_aggr } = req.body

  // build the query 
  let updateScoring = `UPDATE \`major-fantasy-golf\`.Fantasy_Scoring SET updated_at = NOW()`
  if (holes_completed) updateScoring = updateScoring + `, holes_completed = ${holes_completed}`
  if (round1) updateScoring = updateScoring + `, round1 = ${round1}`
  if (round2) updateScoring = updateScoring + `, round2 = ${round2}`
  if (round3) updateScoring = updateScoring + `, round3 = ${round3}`
  if (round4) updateScoring = updateScoring + `, round4 = ${round4}`
  if (round1_aggr) updateScoring = updateScoring + `, round1_aggr = ${round1_aggr}`
  if (round2_aggr) updateScoring = updateScoring + `, round2_aggr = ${round2_aggr}`
  if (round3_aggr) updateScoring = updateScoring + `, round3_aggr = ${round3_aggr}`
  if (round4_aggr) updateScoring = updateScoring + `, round4_aggr = ${round4_aggr}`

  // add where clause
  updateLineups = updateLineups + ` WHERE user_id = ${id}
    AND year = ${year};`  

  try {
    const response = await mysqlPool.query(updateScoring)
    if (response.error) res.status(500).send({msg: 'Error - scoring update Failed'})
    else res.status(201).send({msg: 'Scores Updated'})
  } catch (error) {
    console.error(error)
    res.status(500).send({msg: 'Error - Socoring update Failed'})
  }
})

// Update user scores for specific round  >> Not completed for admin use
router.put('/:id/:round', async (req, res) => {
  const { id, round } = req.params
  const { score, score_aggr } = req.body

  if (round !== 4 || round !== 3 || round !== 2 || round !== 1) res.status(400).send({msg: 'Invalid Round'})
  else {
    let scoreKey = `round${round}`
    let score_aggrKey = `round${round}_aggr`

    // build the query 
    let updateScoring = `UPDATE \`major-fantasy-golf\`.Fantasy_Scoring SET updated_at = NOW()`
    if (score) updateScoring = `, ${scoreKey} = ${score}`
    if (score_aggrKey) updateScoring = `, ${score_aggrKey} = ${score_aggr}`
    
  }

})




// DELETE - NOT FOR USER ADMIN PROCESS TO CLEAR DB SPACE -- Develop Later



module.exports = router