const router = require('express').Router()
require('dotenv').config()
const jwt = require('json-web-token')
// const defineCurrentUser = require('../middleware/defineCurrentUser')


const decryptValue = require('../functions/decryptValue')
const hashValue = require('../functions/hashValue')
const pool = require('../models/db')
const { request } = require('express')


router.post('/', async (req, res) => {
  const { user_name, password } = req.body

  // Check if username or email exists
  const userExistQuery = `Select A.* FROM public."Users" A
    WHERE A.user_name = '${user_name}'
      OR A.email = '${user_name}';`
    
  try {
    const user = await pool.query(userExistQuery)
    if (user.error) res.status(500).send({user})
    else if(user.rowCount === 0) res.status(404).json({message: 'You have entered an invalid username or password'})
    else {
      // User exists - Validate password matches 
      const { rows } = user
      const encryptedSalt = rows[0]["salt"]
      const password_hash = rows[0]["password_hash"]

      // data to be attached to the user
      let returnedUser = {
        user_id: rows[0]["user_id"],
        user_name: rows[0]["user_name"],
        first_name: rows[0]["first_name"],
        last_name: rows[0]["last_name"],
        email: rows[0]["email"],
        role: rows[0]["role"], 
      }

      //decrypt the salt
      const decryptedSalt = decryptValue(encryptedSalt)
      const hashedPassword = hashValue(password + decryptedSalt)
      if (hashedPassword === password_hash) {
        const result = await jwt.encode(process.env.ENCRYPTION_KEY, { id: returnedUser.user_id })
        res.status(200).json({ user: returnedUser, token: result.value })
      } else {
        res.status(404).json({message: 'You have entered an invalid username or password'})
      }

    }
  } catch (error) {
    // console.error(error) 
    res.status(500).send(error)
  }
})

router.get('/profile', async (req, res) => {
  if (!req.currentUser) res.status(404).send(null)
  else {
    // find user
    const userExistQuery = `Select A.user_id,
        A.user_name,
        A.first_name,
        A.last_name,
        A.email,
        A.role,
        B.appearances,
        B.wins,
        B.best_finish,
        B.low_score
      FROM public."Users" A, public."User_Data" B
      WHERE A.user_id = B.user_id
        AND A.user_id = ${req.currentUser};`

    const userRosterQuery = `SELECT A.id,
        A.year,
        A.past_champ,
        A.usa,
        A.intl,
        A.wild_card1,
        A.wild_card2,
        A.wild_card3
      FROM public."User_Rosters" A
      WHERE year = 2023 
        AND user_id = ${req.currentUser}`

        // WHERE year = ${(new Date()).getFullYear()} CHANGE FOR PROD
    try {
      let userRes = await pool.query(userExistQuery)
      let rosterRes = await pool.query(userRosterQuery)
      // User exists - data to be attached to the user
      let UserRows = userRes.rows
      let rosterRows = rosterRes.rows

      let user = {
        user_id: UserRows[0]["user_id"],
        user_name: UserRows[0]["user_name"],
        first_name: UserRows[0]["first_name"],
        last_name: UserRows[0]["last_name"],
        email: UserRows[0]["email"],
        role: UserRows[0]["role"],
        appearances: UserRows[0]["appearances"],
        wins: UserRows[0]["wins"],
        best_finish: UserRows[0]["best_finish"],
        low_score: UserRows[0]["low_score"],
      }

      if (rosterRows.length > 0) {
        user = {
          ...user,
          roster: {
            roster_id: rosterRows[0]["id"],
            year: rosterRows[0]["year"],
            past_champ: rosterRows[0]["past_champ"],
            usa: rosterRows[0]["usa"],
            intl: rosterRows[0]["intl"],
            wild_card1: rosterRows[0]["wild_card1"],
            wild_card2: rosterRows[0]["wild_card2"],
            wild_card3: rosterRows[0]["wild_card3"],
          }
        }
      } else {
        user = {
          ...user,
          roster: {
            year: null,
            past_champ: null,
            usa: null,
            intl: null,
            wild_card1: null,
            wild_card2: null,
            wild_card3: null,
          }
        }
      }
      
      res.status(200).send(user)
    } catch (error) {
    console.error(error)
    res.status(500).send(null)
    }
  }
})

module.exports = router