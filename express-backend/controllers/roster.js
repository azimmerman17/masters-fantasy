const router = require('express').Router()
require('dotenv').config()
const checkLineUpChange = require('../middleware/checkLineupChange')
const { mysqlPool } = require('../models/db')

const year = (new Date()).getFullYear()

// GET
router.get('/:id/:year', async (req, res) => {
  const { id, year } = req.params

  const getRoster = `SELECT year,
      past_champ,
      usa,
      intl,
      wild_card1,
      wild_card2,
      wild_card3
    FROM \`major-fantasy-golf\`.User_Rosters
    WHERE year = ${year}
      AND user_id = ${id}`

  try {
    const [response, metadata] = await mysqlPool.query(getRoster)
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
  let { past_champ, usa, intl, wild_card1, wild_card2, wild_card3, user_id } = req.body

  // validate the  keys
  if (!past_champ) past_champ = null
  if (!usa) usa = null
  if (!intl) intl = null
  if (!wild_card1) wild_card1 = null
  if (!wild_card2) wild_card2 = null
  if (!wild_card1) wild_card3 = null

  if (!user_id) res.status(400).send({msg: 'Unable to find user - Roster not saved'})
  else {
    // check if a roster exists, do not create a new roster if  one exists 
    let validateNew = `Select 'X' FROM \`major-fantasy-golf\`.User_Rosters A, \`major-fantasy-golf\`.Users B
      WHERE A.user_id = B.user_id
        AND A.year = ${year} 
        AND A.user_id = ${user_id}`

    try {
      const [validateResponse, validateMetadata] = await mysqlPool.query(validateNew)
      if (validateResponse.error) res.status(500).send({msg: 'Error - Roster not saved'})
      else if (validateResponse.length > 0) res.status(400).send({msg: 'User already has a Roster - Unable to create a new roster'})
      else {
          // create new roster
        const createRoster = `INSERT INTO \`major-fantasy-golf\`.User_Rosters (past_champ, usa, intl, wild_card1, wild_card2, wild_card3, user_id, year, created_at, updated_at)
          VALUES (${past_champ}, ${usa}, ${intl}, ${wild_card1}, ${wild_card2}, ${wild_card3}, ${user_id}, ${year}, NOW(), NOW())`

        const [response, metadata] = await mysqlPool.query(createRoster)
        if (response.error) res.status(500).send({response})
        else {

          // add to golfers table
          const insertGolfers = `INSERT INTO \`major-fantasy-golf\`.Golfers (golfer_id, year)
          VALUES 
            ${past_champ ? `(${past_champ}, ${year})` : ''}
            ${usa ? `(${usa}, ${year})` : ''}
            ${intl ? `(${intl}, ${year})` : ''}
            ${wild_card1 ? `(${wild_card1}, ${year})` : ''}
            ${wild_card2 ? `(${wild_card2}, ${year})` : ''}
            ${wild_card3 ? `(${wild_card3}, ${year})` : ''}
          ON DUPLICATE KEY UPDATE golfer_id=VALUES(golfer_id)`
          await mysqlPool.query(insertGolfers)
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
  const { past_champ, usa, intl, wild_card1, wild_card2, wild_card3, old_id } = req.body
  console.log('GOOOOO', past_champ, usa, intl, wild_card1, wild_card2, wild_card3, old_id)
  let player_id

  // build the query 
  let updateRoster = `UPDATE \`major-fantasy-golf\`.User_Rosters SET updated_at = NOW()`
  if (past_champ) {
    updateRoster = updateRoster + `, past_champ = ${past_champ}`
    player_id = past_champ
  }
  if (usa) {
    updateRoster = updateRoster + `, usa = ${usa}`
    player_id = usa
  }
  if (intl) {
    updateRoster = updateRoster + `, intl = ${intl}`
    player_id = intl
  }
  if (wild_card1) {
    updateRoster = updateRoster + `, wild_card1 = ${wild_card1}`
    player_id = wild_card1
  }
  if (wild_card2) {
    updateRoster = updateRoster + `, wild_card2 = ${wild_card2}`
    player_id = wild_card2
  }
  if (wild_card3) {
    updateRoster = updateRoster + `, wild_card3 = ${wild_card3}`
    player_id = wild_card3
  }
  // add where clause
  updateRoster = updateRoster + ` WHERE user_id = ${id}
    AND year = ${year};`  

  try {
    const [response, metadata] = await mysqlPool.query(updateRoster)
    await checkLineUpChange(id, year, player_id, old_id)
    if (response.error) res.status(500).send({msg: 'Error - Roster update Failed'})
    else {
      // add to golfers table
      const insertGolfers = `INSERT INTO \`major-fantasy-golf\`.Golfers (golfer_id, year)
      VALUES 
        ${past_champ ? `(${past_champ}, ${year})` : ''}
        ${usa ? `(${usa}, ${year})` : ''}
        ${intl ? `(${intl}, ${year})` : ''}
        ${wild_card1 ? `(${wild_card1}, ${year})` : ''}
        ${wild_card2 ? `(${wild_card2}, ${year})` : ''}
        ${wild_card3 ? `(${wild_card3}, ${year})` : ''}
      ON DUPLICATE KEY UPDATE golfer_id=VALUES(golfer_id)`
      await mysqlPool.query(insertGolfers)

      res.status(201).send({msg: 'Roster Updated'})
    }
  } catch (error) {
    console.error(error)
    res.status(500).send({msg: 'Error - Roster update Failed'})
  }
})

// DELETE - NOT FOR USER ADMIN PROCESS TO CLEAR DB SPACE -- Develop Later



module.exports = router