const router = require('express').Router()
require('dotenv').config()

const checkTeeTimes = require('../functions/checkTeeTimes')
const organizeLineups = require('../functions/organizeLineups')
const updateSeqNum = require('../functions/updateSeqNum')
const updateScores = require('../middleware/updateScores')
const updateConfig = require('../functions/updateConfig')
const updateGolfers  = require('../functions/updateGolfers')
// const updateScoresFile = require('../middleware/updateScoresFile')
// const { mysqlPool, pgPool } = require('../models/db')
const mysqlPool = require('../models/db')

const postScores = require('../functions/postScores')

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
ORDER BY 6, 2 desc, 16 desc, 9, 19 desc, 8, 18 desc, 7, 17 desc,11 asc, 15 asc, 14 asc, 13 asc, 12 asc;`

    const getLineups = `SELECT 
        A.user_id, 
        A.user_name, 
        B.round,B.player1, 
        B.player2, 
        B.player3
      FROM  \`major-fantasy-golf\`.Users A, \`major-fantasy-golf\`.User_Lineups B
      WHERE A.user_id = B.user_id
        And B.year = ${year}
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
    const { leaderboard, pairings} = data
    const { player } = leaderboard

    // Get the Fantasy_Config Data
    const ConfigQuery = `SELECT A.* FROM \`major-fantasy-golf\`.Fantasy_Config A
      WHERE year = (SELECT MAX(A1.year) FROM  \`major-fantasy-golf\`.Fantasy_Config A1);
      --  WHERE A.year = A1.year);`

    const [configResponse, metadata] = await mysqlPool.query(ConfigQuery)
    if (configResponse.error) res.status(500).send({response})
    else {
      let { rnd, tourny_actve, rnd_actve, posted, year, updated_at } = configResponse[0]
      console.log(tourny_actve, rnd_actve, rnd, 'dfgiunbsidfnbipdsgn1')

      // tourny_actve = 'A'
      // rnd_actve = 'A'
      // Get Tee Times - For Config Updates
      const teeTimes = checkTeeTimes(pairings)

      // if tourny_active = 'P' - check config upate, first, update scores, if tourny_active updates to 'A'
      if (tourny_actve === 'P') {
        // check to see if round should change to 1 -  If there are R1 Tee Times, change round to 1
        if (rnd === 0 && teeTimes[0]) rnd = 1
        
        // check if rnd and tourney need to be activated - R1 Tee Time <= Current Time
        if (new Date(teeTimes[0] *1000) <= new Date()) {
          tourny_actve = 'A'
          rnd_actve = 'A'
        }
        // send update to config and player data - if no update in past 5 mins
        if (new Date(updated_at + 5 *60 * 1000) < new Date()) {
          await updateConfig(rnd, tourny_actve, rnd_actve, teeTimes[0], teeTimes[1],teeTimes[2], teeTimes[3], posted, year)
          await updateGolfers(leaderboard, year, rnd, tourny_actve)
          }
  
        // if rnd_actve = 'A' - update scores
        if (rnd_actve === 'A') {
          //update scores
          await updateScores(req.body, configResponse[0])
          console.log('Scores Updated')
          //update leaderboard sequence #
          await updateSeqNum(year)
          console.log('SeqNum updated')
          // update golfer data
          await updateGolfers(leaderboard, year, rnd, tourny_actve)
          res.status(200).send('Scores Updated')
      

        }
        else res.status(202).send('Tournament not active - No scores to update')
      } 
      // if tourny_active = 'A' - check rnd_active, update scores if needed
      else if (tourny_actve === 'A') {
        console.log('Update Scores + Check config for updates', 180)
        console.log(teeTimes[rnd - 1],new Date(teeTimes[rnd - 1]*1000),  new Date(teeTimes[rnd - 1] *1000) <= new Date())
        // if rnd_actve = 'P' - check config upate, first, update scores, if rnd_actve updates to 'A'
        if (rnd_actve === 'P' || rnd_actve === 'A') {        
          // check if rnd activated - Round Tee Time <= Current Time
          if (new Date(teeTimes[rnd - 1] *1000) <= new Date()) {
            rnd_actve = 'A'
          }
          
        // send update to config - if no update in past 5 mins
        if (new Date(updated_at + 5 *60 *1000) < new Date()) {
          console.log('init 191')
          await updateConfig(rnd, tourny_actve, rnd_actve, teeTimes[0], teeTimes[1],teeTimes[2], teeTimes[3], posted, year)
          await updateGolfers(leaderboard, year, rnd, tourny_actve)
        }

          // if rnd_actve = 'A' - update scores
          if (rnd_actve === 'A') {
            console.log('init')
            //update scores
            await updateScores(req.body, configResponse[0])
            console.log('Scores Updated')
            //update leaderboard sequence #
            await updateSeqNum(year)
            console.log('SeqNum updated')
            // update golfer data
            await updateGolfers(leaderboard, year, rnd, tourny_actve)

            res.status(200).send('Scores Updated')
          }
          else res.status(202).send('Tournament not active - No scores to update')
        // if rnd_actve = 'A' - check config upate, and update scores, if round complete set rnd_active to 'F'
        } else if (rnd_actve === 'F') {        
          // check if round complete - set rnd_active and tourny_actve to 'F' if needed 
          let roundComplete = true
          player.forEach(golfer => {
            if (golfer.newStatus !== 'C' || golfer.newStatus !== 'W') {
              if (golfer[`round${rnd}`].roundStatus !== 'Finished') roundComplete = false
            }
          })
          if (roundComplete) rnd_actve = 'F'
          if (rnd === 4)  tourny_actve = 'F'
          
          // if tournament concludes -- post results
          if (tourny_actve === 'F'  && !posted) posted = postScores(posted, year)
          
          // send update to config - if no update in past 5 mins
          if (new Date(updated_at + 5 *60 *1000) < new Date()) {
            await updateConfig(rnd, tourny_actve, rnd_actve, teeTimes[0], teeTimes[1],teeTimes[2], teeTimes[3], posted, year)
          await updateGolfers(leaderboard, year, rnd, tourny_actve)
          }

          //update scores
          await updateScores(req.body, configResponse[0])
          console.log('Scores Updated')
          //update leaderboard sequence #
          await updateSeqNum(year)
          console.log('SeqNum updated')
          // update golfer data
          await updateGolfers(leaderboard, year, rnd, tourny_actve)

          res.status(200).send('Scores Updated')
        // if rnd_actve = 'F' - check config upate - change to next round if nessicary
        } else {
          // rnd 4 completed - Means event has been complete - Check if results are posted - Should be completed already
          if (rnd === 4) {
            tourny_actve === 'F'
            if (!posted)  posted = postScores(posted, year)
          } else {
            // Check if next round is within the next 6 hours - Change to next round if true
            let startTime = teeTimes[rnd]
            if (new Date((startTime - (6 * 60 * 60)) * 1000) <= new Date()) {
              // Change to the next round 
              rnd +=1
              rnd_actve = 'P'
            }
          }

        // send update to config - if no update in past 5 mins
        if (new Date(updated_at + 5 *60 *1000) < new Date()) {
          await updateConfig(rnd, tourny_actve, rnd_actve, teeTimes[0], teeTimes[1],teeTimes[2], teeTimes[3], posted, year)
          await updateGolfers(leaderboard, year, rnd, tourny_actve)
        }          
        res.status(202).send('Round not active - No scores to update')
        }
      // Tournament Complete - Check if scores are posted
      } else {
        console.log('Tournament Complete - Check Posted ')
        if (!posted) {
          console.log('Post scores to user - COMPLETE LATER')
        } else { // Tournment = 'F' Posted = true
          console.log('Tournment complete! See you next year!')
        }

        res.status(202).send('Tournment complete! See you next year!')
      }
    }
  } catch (error) {
      console.error(error)
      res.status(500).send('Error')
  }
})

// NO LONGER USED - COMBINED WITH /sendscores
// router.post('/updatescores', async (req, res) => {

//   console.log('init', new Date())
//   try {
//     await updateScores(req.body)
//     console.log('Scores Updated')
//     updateScoresFile.lastUpdate = new Date()
//     await updateSeqNum()
//     console.log('SeqNum updated')
//     res.status(200).send('Done')
//   } catch (error) {
//     console.error(error)
//     res.status(500).send('Error')
//   }

// })


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