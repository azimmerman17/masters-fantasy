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

    try {
      let user = await pool.query(userExistQuery)
      // User exists - data to be attached to the user
      const { rows } = user

      let returnedUser = {
        user_id: rows[0]["user_id"],
        user_name: rows[0]["user_name"],
        first_name: rows[0]["first_name"],
        last_name: rows[0]["last_name"],
        email: rows[0]["email"],
        role: rows[0]["role"],
        appearances: rows[0]["appearances"],
        wins: rows[0]["wins"],
        best_finish: rows[0]["best_finish"],
        low_score: rows[0]["low_score"],
      }
      res.status(200).send(returnedUser)
    } catch (error) {
    // console.error(error)
    res.status(500).send(null)
    }
  }
})

module.exports = router