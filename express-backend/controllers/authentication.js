const router = require('express').Router()
require('dotenv').config()
const jwt = require('json-web-token')

const decryptValue = require('../functions/decryptValue')
const hashValue = require('../functions/hashValue')
const pool = require('../models/db')

// const year = (new Date()).getFullYear()
const year = 2023

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
        B.low_score,
        C.id,
        C.year,
        C.past_champ,
        C.usa,
        C.intl,
        C.wild_card1,
        C.wild_card2,
        C.wild_card3,
        (D.round1 + D.round2 + D.round3 + D.round4) as "total",
        D.round1,
        D.round2,
        D.round3,
        D.round4,
        (D.round1_aggr + D.round2_aggr + D.round3_aggr + D.round4_aggr) as "total_aggr",
        D.round1_aggr,
        D.round2_aggr,
        D.round3_aggr,
        D.round4_aggr
      FROM public."Users" A, public."User_Data" B 
      LEFT JOIN public."User_Rosters" C
        ON C.user_id = B.user_id
          AND C.year = ${year}
      LEFT JOIN public."Fantasy_Scoring" D
        ON D.user_id = B.user_id
          AND D.year = ${year}
      WHERE A.user_id = B.user_id
        AND A.user_id = ${req.currentUser};`

    const userlineupQuery = `SELECT A.player1,
        A.player2,
        A.player3,
        A.year
      FROM public."User_Lineups" A
      WHERE year = 2023 
        AND user_id = ${req.currentUser}`

        // WHERE year = ${(new Date()).getFullYear()} CHANGE FOR PROD
    try {
      let userRes = await pool.query(userExistQuery)
      let linupRes = await pool.query(userlineupQuery)
      // User exists - data to be attached to the user
      let userRows = userRes.rows
      let lineupRows = linupRes.rows
      let lineups = []
    
      for (let i = 0; i < 4; i++) {
        if (lineupRows[i]) {
          lineups.push({
            year: lineupRows[i]["year"],
            round: i + 1,
            player1: lineupRows[i]["player1"],
            player2: lineupRows[i]["player2"],
            player3: lineupRows[i]["player3"],
          })
        } else {
          lineups.push({
            year: null,
            round: i + 1,
            player1: null,
            player2: null,
            player3: null,
          })
        }
      }

      let user = {
        user_id: userRows[0]["user_id"],
        user_name: userRows[0]["user_name"],
        first_name: userRows[0]["first_name"],
        last_name: userRows[0]["last_name"],
        email: userRows[0]["email"],
        role: userRows[0]["role"],
        appearances: userRows[0]["appearances"],
        wins: userRows[0]["wins"],
        best_finish: userRows[0]["best_finish"],
        low_score: userRows[0]["low_score"],
        roster: {
          year: userRows[0]["year"],
          past_champ: userRows[0]["past_champ"],
          usa: userRows[0]["usa"],
          intl: userRows[0]["intl"],
          wild_card1: userRows[0]["wild_card1"],
          wild_card2: userRows[0]["wild_card2"],
          wild_card3: userRows[0]["wild_card3"],
        },
        lineups: lineups,
        scoring: {
          year: userRows[0]["year"],
          total: {
            score: userRows[0]["total"],
            aggr: userRows[0]["total_aggr"] 

          },
          round1: {
            score: userRows[0]["round1"],
            aggr: userRows[0]["round1_aggr"]
          },
          round2: {
            score: userRows[0]["round2"],
            aggr: userRows[0]["round2_aggr"]
          },
          round3: {
            score: userRows[0]["round3"],
            aggr: userRows[0]["round3_aggr"]
          },
          round4: {
            score: userRows[0]["round4"],
            aggr: userRows[0]["round4_aggr"]
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