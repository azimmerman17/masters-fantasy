const router = require('express').Router()
require('dotenv').config()
const pool = require('../models/db')

// GET
// GET- All lineups for specific round
router.get('/round/:year/:round', async (req, res) => {
  const { year, round } = req.params

  // round cannot be > 4 or < 1 and year cannot be > current year
  let errorMsg = {}
  if (round > 4 || round < 1) errorMsg["roundError"] = `Invalid Round Value - Round ${round}`
  if ((new Date()).getFullYear() < year) errorMsg["yearError"] = `Year cannot be greater than the current year - Year ${year}`
  // send the errors if exists
  if (errorMsg["roundError"] || errorMsg["yearError"]) res.status(400).send(errorMsg)
  else {
    const getLineups = `SELECT A.user_id,
        A.roster_id,
        A.year,
        A.round,
        A.player1,
        A.player2,
        A.player3
      FROM public."User_Lineups" A
      WHERE A.year = ${year}
        AND A.round = ${round};`

    try {
      const response = await pool.query(getLineups)
      if (response.error) res.status(500).send({response})
      else {
        // clean the data
        res.status(200).send(response)
      }
    } catch (error) {
      res.status(500).send(error)
    }
  }
})


// GET - All lineps for all rounds for specific player
router.get('/player/:year/:id', async (req, res) => {
  const { year, id } = req.params

    // year cannot be > current year
    let errorMsg = {}
    if ((new Date()).getFullYear() < year) errorMsg["yearError"] = `Year cannot be greater than the current year - Year ${year}`
    // send the errors if exists
    if (errorMsg["yearError"]) res.status(400).send(errorMsg)
    else {
      const getLineups = `SELECT A.user_id,
          A.roster_id,
          A.year,
          A.round,
          A.player1,
          A.player2,
          A.player3
        FROM public."User_Lineups" A
        WHERE A.year = ${year}
          AND A.user_id = ${id};`
  
      try {
        const response = await pool.query(getLineups)
        if (response.error) res.status(500).send({response})
        else {
          // clean the data
          res.status(200).send(response)
        }
      } catch (error) {
        res.status(500).send(error)
      }
    }
})

// GET - Lineup for specific round for specific player
router.get('/player/:year/:id/round/:round', async (req, res) => {
  const { year, round, id } = req.params

  // round cannot be > 4 or < 1 and year cannot be > current year
  let errorMsg = {}
  if (round > 4 || round < 1) errorMsg["roundError"] = `Invalid Round Value - Round ${round}`
  if ((new Date()).getFullYear() < year) errorMsg["yearError"] = `Year cannot be greater than the current year - Year ${year}`
  // send the errors if exists

  if (errorMsg["roundError"] || errorMsg["yearError"]) res.status(400).send(errorMsg)
  else {
    const getLineups = `SELECT A.user_id,
        A.roster_id,
        A.year,
        A.round,
        A.player1,
        A.player2,
        A.player3
      FROM public."User_Lineups" A
      WHERE A.year = ${year}
        AND A.user_id = ${id};`

    try {
      const response = await pool.query(getLineups)
      if (response.error) res.status(500).send({response})
      else {
        // clean the data
        res.status(200).send(response)
      }
    } catch (error) {
      res.status(500).send(error)
    }

  }
})

// POST
// Create new lineup, this will happen automatically after the roster is full - builds all 4 rounds
router.post('/new', async (req, res) => {
  // DEFAULT LINEUP - past_champ, usa, intl
  const { roster_id, past_champ, usa, intl, user_id } = req.body
  const year = (new Date()).getFullYear()

  let roundInsertmsg = []
  if (!roster_id || !past_champ || !usa || !intl || !user_id) res.status(400).send({msg: 'Unable to add lineups, missing data'})
  else {
    // Create all lineups for the week using the default
    for (let i = 1; i < 5; i++) {
      // validate lineup does not exist
      let validateNew = `Select 'X' FROM public."User_Lineups" A
      WHERE A.year = ${year} 
        AND A.user_id = ${user_id}
        AND A.round = ${i};`

        try {
          const validateResponse = await pool.query(validateNew) 
          if (validateResponse.error) roundInsertmsg.push(`Round ${i}} 500 Error - Could not valitate if lineup exists`)
          else if (validateResponse.rowCount > 0) {
            roundInsertmsg.push(`Round ${i} 400 Error - Lineups already existed`)
            continue
          }
          else {
            // Create lineup if not exists
            let insertRoundQuery = `INSERT INTO public."User_Lineups" (user_id, roster_id, year, round, player1, player2, player3, created_at, updated_at)
              VALUES (${user_id}, ${roster_id}, ${year}, ${i}, ${past_champ}, ${usa}, ${intl}, NOW(), NOW());`
            
              const response = await pool.query(insertRoundQuery)
              if (response.error) roundInsertmsg.push(`Round ${i} 500 Error - Lineups not saved`)
              else roundInsertmsg.push(`Round ${i} - Successfully inserted`)
          }
        } catch (error) {
          console.error(error)
          roundInsertmsg.push(`Round ${i} 500 Error - Interal Error`)
          continue
        }
    }
    res.send(roundInsertmsg)
  }
})

// PUT
// Update lineup - cascades to update future rounds
router.put('/:id/:round', async (req, res) => {
  const { id, round } = req.params
  const { player1, player2, player3 } = req.body
  const year = (new Date()).getFullYear()

  //   // build the query 
  let updateLineups = `UPDATE public."User_Lineups" SET updated_at = NOW()`
  if (player1) updateLineups = updateLineups + `, player1 = ${player1}` 
  if (player2) updateLineups = updateLineups + `, player2 = ${player2}`
  if (player3) updateLineups = updateLineups + `, player3 = ${player3}`

  // add where clause
  updateLineups = updateLineups + ` WHERE user_id = ${id}
    AND year = ${year}
    AND round >= ${round};`  

  try {
    const response = await pool.query(updateLineups)
    if (response.error) res.status(500).send({msg: 'Error - Lineup update Failed'})
    else res.status(201).send({msg: 'Lineup Updated'})
  } catch (error) {
    console.error(error)
    res.status(500).send({msg: 'Error - Lineup update Failed'})
  }
})



// DELETE - NOT FOR USER ADMIN PROCESS TO CLEAR DB SPACE -- Develop Later


module.exports = router