const router = require('express').Router()
require('dotenv').config()
const pool = require('../models/db')

// GET
router.get('/:id/:year', async (req, res) => {
  const { id, year } = req.params

  const getRoster = `SELECT A.year,
      A.past_champ,
      A.usa,
      A.intl,
      A.wild_card1,
      wild_card2,
      wild_card3
    FROM public."User_Rosters"
    WHERE year = ${year}
      AND user_id = ${id}`

  try {
    const response = await pool.query(getRoster)
    if (response.error) res.status(500).send({response})
    else {
      // clean the data
      res.status(200).send(response)
    }
  } catch (error) {
    res.status(500).send(error)
  }

})

// POST
router.post('/new', async (req, res) => {
  // inputs - each golfer and user_id - golfers are not required
  //derived - year
  const { past_champ, usa, intl, wild_card1, wild_card2, wild_card3, user_id } = req.body
  // const year = (new Date()).getFullYear()
  const year = 2023 //  testing 

  if (!user_id) res.status(400).send({msg: 'Unable to find user - Roster not saved'})
  else {
    // check if a roster exists, do not create a new roster if  one exists 
    let validateNew = `Select 'X' FROM public."User_Rosters" A, public."Users" B
      WHERE A.user_id = B.user_id
        AND A.year = ${year} 
        AND A.user_id = ${user_id}`

    try {
      const validateResponse = await pool.query(validateNew)
      if (validateResponse.error) res.status(500).send({msg: 'Error - Roster not saved'})
      else if (validateResponse.rowCount > 0) res.status(400).send({msg: 'User already has a Roster - Unable to create a new roster'})
      else {
        // create new roster
      const createRoster = `INSERT INTO public."User_Rosters" (past_champ, usa, intl, wild_card1, wild_card2, wild_card3, user_id, year, created_at, updated_at)
        VALUES (${past_champ}, ${usa}, ${intl}, ${wild_card1}, ${wild_card2}, ${wild_card3}, ${user_id}, ${year}, NOW(), NOW())`

      const response = await pool.query(createRoster)
      if (response.error) res.status(500).send({response})
      else {
        res.status(201).send({msg: 'Roster Saved'})
      }
    }
    } catch (error) {
      console.error(error)
      res.status(500).send({msg: 'Error - Roster not saved'})
    }
  }
})

// PUT
router.put('/:id', async (req, res) => {
  const { id } = req.params
  const { past_champ, usa, intl, wild_card1, wild_card2, wild_card3 } = req.body
  // const year = (new Date()).getFullYear()
  const year = 2023 // testing

  // build the query 
  let updateRoster = `UPDATE public."User_Rosters" SET updated_at = NOW()`
  if (past_champ) updateRoster = updateRoster + `, past_champ = ${past_champ}` 
  if (usa) updateRoster = updateRoster + `, usa = ${usa}`
  if (intl) updateRoster = updateRoster + `, intl = ${intl}`
  if (wild_card1) updateRoster = updateRoster + `, wild_card1 = ${wild_card1}`
  if (wild_card2) updateRoster = updateRoster + `, wild_card2 = ${wild_card2}`
  if (wild_card3) updateRoster = updateRoster + `, wild_card3 = ${wild_card3}`
  // add where clause
  updateRoster = updateRoster + ` WHERE user_id = ${id}
    AND year = ${year};`  

  try {
    const response = await pool.query(updateRoster)
    if (response.error) res.status(500).send({msg: 'Error - Roster update Failed'})
    else res.status(201).send({msg: 'Roster Updated'})
  } catch (error) {
    console.error(error)
    res.status(500).send({msg: 'Error - Roster update Failed'})
  }
})

// DELETE - NOT FOR USER ADMIN PROCESS TO CLEAR DB SPACE -- Develop Later



module.exports = router