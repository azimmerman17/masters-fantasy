const router = require('express').Router()
require('dotenv').config()
const pool = require('../models/db')

//  Derive the date
// const year = (new Date().getFullYear())
const year = 2023

// GET
// Get leaderboard for entire field
router.get('/', async (req, res) => {

  const getScores = `SELECT A.user_name,
      B.holes_completed,
      (B.round1 + B.round2 + B.round3 + B.round4) as "total",
      B.round1,
      B.round2,
      B.round3,
      B.round4
    FROM public."Users" A, public."Fantasy_Scoring" B
    WHERE A.user_id = B.user_id
      AND year = ${year}
    ORDER BY 3, 2 desc, 7, 6, 5, 4, (B.round1_no_bb + B.round2_no_bb + B.round3_no_bb + B.round4_no_bb) desc, B.round1_no_bb desc,  B.round2_no_bb desc, B.round3_no_bb desc, B.round4_no_bb desc ;`

  try {
    const response = await pool.query(getScores)
    console.log(response)
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

// GET - Scores for a specific user
router.get('/:id', async (req, res) => {
  const { id } = req.params

  const getScores = `SELECT A.user_name,
      B.holes_completed,
      (B.round1 + B.round2 + B.round3 + B.round4) as "total",
      B.round1,
      B.round2,
      B.round3,
      B.round4,
      (B.round1_no_bb + B.round2_no_bb + B.round3_no_bb + B.round4_no_bb), as "total_no_bb"
      B.round1_no_bb,
      B.round2_no_bb, 
      B.round3_no_bb,
      B.round4_no_bb 
    FROM public."Users" A, public."Fantasy_Scoring" B
    WHERE A.user_id = B.user_id
      AND year = ${year}
      AND A.user_id = ${id}
    ORDER BY 3, 2 desc, 7, 6, 5, 4, (B.round1_no_bb + B.round2_no_bb + B.round3_no_bb + B.round4_no_bb) desc, B.round1_no_bb desc,  B.round2_no_bb desc, B.round3_no_bb desc, B.round4_no_bb desc ;`

  try {
    const response = await pool.query(getScores)
    console.log(response)
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
router.post('/new', async (req, res) => {
  // pass in user_id
  // derive year
  const { user_id } = req.body
  if (!user_id) res.status(400).send({msg: 'Unable to add scoring record, missing user_id'})
  else {
    // check if record exists
    let validateNew = `Select 'X' FROM public."Fantasy_Scoring" A
      WHERE A.year = ${year} 
        AND A.user_id = ${user_id}};`
  
    try {
      const validateResponse = await pool.query(validateNew) 
      if (validateResponse.error) res.status(500).send({msg: 'scoring record addition failled'})
      else if (validateResponse.rowCount > 0) res.status(400).send({msg: 'scoring record already exists'})
      else {
        // create scoring record
        let insertScoringQuery = `INSERT INTO public."Fantasy_Scoring" (user_id, year, created_at, updated_at)
          VALUES (${user_id}, ${year}, NOW(), NOW());`

        const response = await pool.query(insertScoringQuery)
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
  const { holes_completed, round1, round2, round3, round4, round1_no_bb, round2_no_bb, round3_no_bb, round4_no_bb } = req.body

  // build the query 
  let updateScoring = `UPDATE public."Fantasy_Scoring" SET updated_at = NOW()`
  if (holes_completed) updateScoring = updateScoring + `, holes_completed = ${holes_completed}`
  if (round1) updateScoring = updateScoring + `, round1 = ${round1}`
  if (round2) updateScoring = updateScoring + `, round2 = ${round2}`
  if (round3) updateScoring = updateScoring + `, round3 = ${round3}`
  if (round4) updateScoring = updateScoring + `, round4 = ${round4}`
  if (round1_no_bb) updateScoring = updateScoring + `, round1_no_bb = ${round1_no_bb}`
  if (round2_no_bb) updateScoring = updateScoring + `, round2_no_bb = ${round2_no_bb}`
  if (round3_no_bb) updateScoring = updateScoring + `, round3_no_bb = ${round3_no_bb}`
  if (round4_no_bb) updateScoring = updateScoring + `, round4_no_bb = ${round4_no_bb}`

  // add where clause
  updateLineups = updateLineups + ` WHERE user_id = ${id}
    AND year = ${year};`  

  try {
    const response = await pool.query(updateScoring)
    if (response.error) res.status(500).send({msg: 'Error - scoring update Failed'})
    else res.status(201).send({msg: 'Scores Updated'})
  } catch (error) {
    console.error(error)
    res.status(500).send({msg: 'Error - Socoring update Failed'})
  }
})

// Update user scores for specific round
router.put('/:id/:round', async (req, res) => {
  const { id, round } = req.params
  const { score, score_aggr } = req.body

  if (round !== 4 || round !== 3 || round !== 2 || round !== 1) res.status(400).send({msg: 'Invalid Round'})
  else {
    let scoreKey = `round${round}`
    let score_aggrKey = `round${round}_no_bb`

    // build the query 
    let updateScoring = `UPDATE public."Fantasy_Scoring" SET updated_at = NOW()`
    if (score) updateScoring = `, ${scoreKey} = ${score}`
    if (score_aggrKey) updateScoring = `, ${score_aggrKey} = ${score_aggr}`
    
  }

})




// DELETE - NOT FOR USER ADMIN PROCESS TO CLEAR DB SPACE -- Develop Later



module.exports = router