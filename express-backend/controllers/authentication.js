const router = require('express').Router()
require('dotenv').config()
const jwt = require('json-web-token')

const decryptValue = require('../functions/decryptValue')
const hashValue = require('../functions/hashValue')
const { mysqlPool } = require('../models/db')

const year = (new Date()).getFullYear()

router.post('/', async (req, res) => {
  const { user_name, password } = req.body

  const userExistQuery = `Select A.* FROM \`major-fantasy-golf\`.Users A
    WHERE A.user_name = '${user_name.toLowerCase()}'
      OR A.email = '${user_name.toLowerCase()}';`
    
  try {
    const [user, metadata] = await mysqlPool.query(userExistQuery)
    if (user.error) {
      console.error(user.error)
      res.status(500).send({user})
    } else if(user.length === 0) {
      console.log('You have entered an invalid username or password, 0 rows returned')
      res.status(404).json({message: 'You have entered an invalid username or password'})
    } else {
      // User exists - Validate password matches 
      const encryptedSalt = user[0]["salt"]
      const password_hash = user[0]["password_hash"]

      // data to be attached to the user
      let returnedUser = {
        user_id: user[0]["user_id"],
        user_name: user[0]["user_name"],
        first_name: user[0]["first_name"],
        last_name: user[0]["last_name"],
        email: user[0]["email"],
        role: user[0]["role"], 
      }

      //decrypt the salt
      const decryptedSalt = decryptValue(encryptedSalt)
      const hashedPassword = hashValue(password + decryptedSalt)
      if (hashedPassword === password_hash) {
        const result = await jwt.encode(process.env.ENCRYPTION_KEY, { id: returnedUser.user_id })
        res.status(200).json({ user: returnedUser, token: result.value })
      } else {
        console.log('You have entered an invalid username or password, unable to authenticate')
        res.status(404).json({message: 'You have entered an invalid username or password'})
      }
    }
  } catch (error) {
    console.error(error) 
    res.status(500).send(error)
  }
})

router.get('/profile', async (req, res) => {
  if (!req.currentUser) res.status(204).send(null)
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
        D.holes_completed,
        CASE 
          WHEN D.holes_completed = 0 THEN 0
          ELSE (D.round1 + D.round2 + D.round3 + D.round4)
        END as "total",
        CASE 
          WHEN D.holes_completed = 0 THEN 0
          ELSE D.round1
        END,
        CASE 
          WHEN D.holes_completed <= 18 THEN 0
          ELSE D.round2
        END,
        CASE 
          WHEN D.holes_completed <= 36 THEN 0
          ELSE D.round3
        END,
        CASE 
          WHEN D.holes_completed <= 54 THEN 0
          ELSE D.round4 
        END,
        CASE 
          WHEN D.holes_completed = 0 THEN 0 
          ELSE (D.round1_aggr + D.round2_aggr + D.round3_aggr + D.round4_aggr) 
        END as "total_aggr",
        CASE 
          WHEN D.holes_completed = 0 THEN 0 
          ELSE D.round1_aggr
        END,
        CASE 
          WHEN D.holes_completed <= 18 THEN 0 
          ELSE D.round2_aggr
        END,
        CASE 
          WHEN D.holes_completed <= 36 THEN 0 
          ELSE D.round3_aggr
        END,
        CASE 
          WHEN D.holes_completed <= 55 THEN 0 
          ELSE D.round4_aggr 
        END
      FROM \`major-fantasy-golf\`.Users A, \`major-fantasy-golf\`.User_Data B 
      LEFT JOIN \`major-fantasy-golf\`.User_Rosters C
        ON C.user_id = B.user_id
          AND C.year = ${year}
      LEFT JOIN \`major-fantasy-golf\`.Fantasy_Scoring D
        ON D.user_id = B.user_id
          AND D.year = ${year}
      WHERE A.user_id = B.user_id
        AND A.user_id = ${req.currentUser};`

    const userlineupQuery = `SELECT A.player1,
        A.player2,
        A.player3,
        A.year
      FROM \`major-fantasy-golf\`.User_Lineups A
      WHERE year = ${year} 
        AND user_id = ${req.currentUser}
      ORDER BY A.round;`

        // WHERE year = ${(new Date()).getFullYear()} CHANGE FOR PROD
    try {
      let [userRes, userMetadata] = await mysqlPool.query(userExistQuery)
      let [linupRes, lineupMetadata] = await mysqlPool.query(userlineupQuery)
      // User exists - data to be attached to the user
console.log(userRes, linupRes)
      let lineups = []
    
      for (let i = 0; i < 4; i++) {
        if (linupRes[i]) {
          lineups.push({
            year: linupRes[i]["year"],
            round: i + 1,
            player1: linupRes[i]["player1"],
            player2: linupRes[i]["player2"],
            player3: linupRes[i]["player3"],
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
        user_id: userRes[0]["user_id"],
        user_name: userRes[0]["user_name"],
        first_name: userRes[0]["first_name"],
        last_name: userRes[0]["last_name"],
        email: userRes[0]["email"],
        role: userRes[0]["role"],
        appearances: userRes[0]["appearances"],
        wins: userRes[0]["wins"],
        best_finish: userRes[0]["best_finish"],
        low_score: userRes[0]["low_score"],
        roster: {
          year: userRes[0]["year"],
          past_champ: userRes[0]["past_champ"],
          usa: userRes[0]["usa"],
          intl: userRes[0]["intl"],
          wild_card1: userRes[0]["wild_card1"],
          wild_card2: userRes[0]["wild_card2"],
          wild_card3: userRes[0]["wild_card3"],
        },
        lineups: lineups,
        scoring: {
          holes_completed:  userRes[0]["holes_completed"],
          year: userRes[0]["year"],
          total: {
            score: userRes[0]["total"],
            aggr: userRes[0]["total_aggr"] 

          },
          rounds: [
            {
              round: 1,
              score: userRes[0]["round1"],
              aggr: userRes[0]["round1_aggr"]
            },
            {
              round: 2,
              score: userRes[0]["round2"],
              aggr: userRes[0]["round2_aggr"]
            },
            {              
              round: 3,
              score: userRes[0]["round3"],
              aggr: userRes[0]["round3_aggr"]
            },
            {
              round: 4,
              score: userRes[0]["round4"],
              aggr: userRes[0]["round4_aggr"]
            }

          ]
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