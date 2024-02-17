const router = require('express').Router()
require('dotenv').config()
const pool = require('../models/db')

// Functions
const generateSalt = require('../functions/generateSalt')
const encryptVaule = require('../functions/encryptValue')
const hashValue = require('../functions/hashValue')
const decryptValue = require('../functions/decryptValue')

// GET
// GET ALL USERS
router.get('/', async (req, res) => {
  const getUsers = `SELECT A.user_id,
      A.user_name,
      A.first_name,
      A.last_name,
      A.email,
      B.appearances,
      B.wins,
      B.best_finish,
      B.low_score
    FROM public."Users" A, public."User_Data" B
    WHERE A.user_id = B.user_id;`

    try {
      const response = await pool.query(getUsers)
      if (response.error) res.status(500).send({response})
      else res.status(200).send(response)
    } catch (error) {
      res.status(500).send(error)
    }
})

//GET LIST OF USERNAMES TO VALIDATE NEW USER ON FRONTEND
router.get('/usernamelist', async (req, res) => {
  const getUsers = `SELECT A.user_name, A.email FROM public."Users" A;`
  try {
    const response = await pool.query(getUsers)
    if (response.error) res.status(500).send({response})
    else {
      const { rows } = response
      // transform key-value pairs to just value
      let userNames = []
      let emails = []
      rows.forEach(row => {
        // console.log(row)
        userNames.push(row['user_name'])
        emails.push(row['email'])
      })
      res.status(200).send([userNames, emails])
    }
  } catch (error) {
    res.status(500).send(error)
  }
})

// GET A SINGLE USER
router.get('/:id', async (req, res) => {
  const { id } = req.params

  const getUser = `SELECT A.user_id,
      A.user_name,
      A.first_name,
      A.last_name,
      A.email,
      B.appearances,
      B.wins,
      B.best_finish,
      B.low_score
    FROM public."Users" A, public."User_Data" B
    WHERE A.user_id = B.user_id 
      AND A.user_name = '${id}';`

    try {
      const response = await pool.query(getUser)
      if (response.error) res.status(500).send({response})
      else {
        const { rows } = response
        res.status(200).send(rows[0])
      }
    } catch (error) {
      console.error(error)
      res.status(500).send(error)
    }
})

// POST
// CREATE A USER PROFILE
router.post('/new', async (req, res) => {
  //inputs -- first_name, last_name, user_name, email, password
  // auto-generate -- user_id, role, created_at, update_at
  // dervived -- salt, password_hash
  const { first_name, last_name, user_name, email, password } = req.body

  // Validate if user_name and email are unique
  const checkUserName = `SELECT A.user_name FROM public."Users" A
    WHERE A.user_name = '${user_name.toLowerCase()}'
      OR A.email = '${email.toLowerCase()}'`

  try {
    const userNameResponse = await pool.query(checkUserName)
        
    if (!user_name || !email || !password) res.status(400).send('Invalid request - Required fields not entered')
    else if (userNameResponse.rowCount > 0) res.status(400).send('Invalid request - Username or Email already exists')
    else {
      salt = generateSalt()// function to generate salt
      let encryptedSalt = encryptVaule(salt) // function to encrypt the salt
      let passwordHash = hashValue(password + salt) // funtion to hash the password

      // Insert Query for new user
      const createUser = `INSERT INTO public."Users" (first_name, last_name, user_name, email, salt, password_hash, created_at, updated_at)
        VALUES (${first_name ? `'${first_name}'` : undefined},
          ${last_name ? `'${last_name}'` : undefined},
          '${user_name.toLowerCase()}', 
          '${email.toLowerCase()}',
          '${encryptedSalt}',
          '${passwordHash}',
          NOW(), 
          NOW());`

      let response = await pool.query(createUser)
      if (response.error) res.status(500).send({response})
      else {
        // Query to get the user id 
        const getUserId = `SELECT A.user_id FROM public."Users" A
          WHERE A.user_name = '${user_name.toLowerCase()}';`

        response = await pool.query(getUserId)
        if (response.error) res.status(500).send({response})
        else {
          const { rows } = response
          // Query to add record to the User Data Table
          const userDataInsert = `INSERT INTO public."User_Data" (user_id, created_at, updated_at)
            VALUES (${rows[0]["user_id"]}, NOW(), NOW());` 

            console.log(userDataInsert)
            response = await pool.query(userDataInsert)
            if (response.error) res.status(500).send({response})
            else res.status(200).send(response)
          }
        }
      }
    } catch (error) {
      console.error(error)
      res.status(500).send(error)
    }
})

// PUT
// Udate user info --  VALIDATE UNIQUE EMAIL AND USERNAME
router.put('/:id', async (req, res) => {
  const { first_name, last_name, user_name, email } = req.body
  const { id } = req.params

  // Validate if user_name and email are unique
  let rowCount = 0
  if (email || user_name) {
    const checkUserName = `SELECT A.user_name FROM public."Users" A
    WHERE (A.user_name = '${user_name ? user_name.toLowerCase() : ''}'  
        OR A.email = '${email ? email.toLowerCase() : ''}')
      AND A.user_id <> ${id};`

    try {
      const userNameResponse = await pool.query(checkUserName)
      rowCount = userNameResponse.rowCount
    } catch (error) {
      console.error(error)
      res.status(500).send(error)
    }
  }

  // No update if email 
  if (rowCount > 0)  res.status(400).send('Invalid request - Username or Email already exists')
  // build the query 
  let updateUser = `UPDATE public."Users"
  SET updated_at = NOW()`

  if (first_name) updateUser = updateUser + `, first_name = '${first_name}'`
  if (last_name) updateUser = updateUser + `, last_name = '${last_name}'`  
  if (user_name) updateUser = updateUser + `, user_name = '${user_name.toLowerCase()}'`
  if (email) updateUser = updateUser + `, email = '${email.toLowerCase()}'`

  // and where clause
  updateUser = updateUser + `
  WHERE user_id = '${id}';`

  try {
    const response = await pool.query(updateUser)
    if (response.error) res.status(500).send(response)
    else res.status(200).send(response)
  } catch (error) {
    console.error(error)
    res.status(500).send(error)
  }
})

// UPDATE USER ROLE - Admin only access
router.put('/:username/role', async (req, res) => {
  const { role } = req.body
  const { username } = req.params

  // build the query 
  let updateUserRole = `UPDATE public."Users"
  SET updated_at = NOW(),
    role = '${role}'
  WHERE user_name = '${username.toLowerCase()}';`

  try {
    const response = await pool.query(updateUserRole)
    if (response.error) res.status(500).send({response})
    else res.status(200).send(response)
  } catch (error) {
    console.error(error)
    res.status(500).send(error)
  }
})

// UPDATE USER PASSWORD
router.put('/:username/password', async (req, res) => {
  const { password } = req.body
  const { username } = req.params

  // Get salt for password hashing
  const saltQuery = `SELECT A.salt FROM public."Users" A
    WHERE user_name = '${username.toLowerCase()}'
    LIMIT 1;`

  try {
    const response = await pool.query(saltQuery)
    if (response.error) {res.status(500).send({response})}
    else {
      const { rows } = response 
      const { salt } = rows[0]

      let decryptedSalt = decryptValue(salt) // decrypt salt value from the db
      let passwordHash = hashValue(password + decryptedSalt) // funtion to hash the new password

      // build new password query
      let updateUserPassword = `UPDATE public."Users"
        SET updated_at = NOW(),
          password_hash = '${passwordHash}'
        WHERE user_name = '${username.toLowerCase()}';`

      const response = await pool.query(updateUserPassword)
      if (response.error) {res.status(500).send({response})}
      else res.status(200).send(response)
    }
  } catch (error) { // catch for the Salt Query
    console.error(error)
    res.status(500).send(error)
  }
})

// DELETE -  remember to cascade!! 
router.delete('/:id', async (req, res) => {
  const { id } = req.params

  // remove User from table - remove data from child tables first
  const removeUser = `DELETE FROM public."Users" 
    WHERE user_name = '${id.toLowerCase()}';`

  const removeUserData = `DELETE FROM public."User_Data" 
    WHERE user_id = (SELECT A.user_id FROM public."Users" A
                        WHERE A.user_name = '${id.toLowerCase()}');`

  try {
    await pool.query(removeUserData)
    await pool.query(removeUser)
    res.status(200).send('User Deleted')
  } catch (error) { 
    console.error(error)
    res.status(500).send(error)
  }
})


module.exports = router
