const router = require('express').Router()
const { UAParser } =require('ua-parser-js')
require('dotenv').config()
const decryptValue = require('../functions/decryptValue')
const generatePasswordResetToken = require('../functions/generatePasswordResetToken')
const generateResetEmail = require('../functions/generateResetEmail')
const hashValue = require('../functions/hashValue')
const sendEmail = require('../functions/sendEmail')
const pool = require('../models/db')

// ONLY POST routes
// Forgot Password Reset
router.post('/forgotpassword', async (req, res) => {
  // pass in user_name or email
  const { user_info } = req.body
  const userAgent = req.headers['user-agent']
  // parser the userAgent for OS and Browser
  let parser = new UAParser(userAgent); // you need to pass the user-agent for nodejs

  let browser = parser.getBrowser()
  browser = browser.name
  let os = parser.getOS()
  os = os.name

  if (!user_info) res.status(400).send('Need email or user_name')
  else if (!os || !browser) res.status(400).send('Need browser and os data')
  else {
    // check if user exists 
    const userExistsQuery = `SELECT user_name, first_name, last_name, email, salt FROM public."Users"
      WHERE user_name ='${user_info}'
        OR email = '${user_info}';`

    try {
      let userExistsRespose = await pool.query(userExistsQuery)
      const { rows, rowCount } = userExistsRespose
      if (rowCount < 1) res.status(400).send('User does not exist')
      else if (rowCount > 1) res.status(400).send('User cannot be indentified')
      else {
        const { user_name, first_name, last_name, salt, email} = rows[0]
        // user exists - create reset password token 
        let token = await generatePasswordResetToken(user_name, salt)
        // decrypt salt
        let decryptedSalt = decryptValue(salt)

        // set Hashed token in the database
        let hashedToken = hashValue(token[0]+ decryptedSalt)
        let updateQuery = `UPDATE public."Users"
          SET guid_token = '${hashedToken}',
            guid_expire = NOW() + INTERVAL '1 hour'
          WHERE user_name = '${user_name}'`

        let guidInsert = false
        try {
          await pool.query(updateQuery)
          guidInsert = true
        } catch (error) {
          console.error(error)
          res.status(500).send('SQL error')
        }
        if (guidInsert) {
          // send email to user encrypt username, token value
          let html = await generateResetEmail(first_name, last_name, os, browser, token)
          await sendEmail(html, email, 'Your request to reset password')
          res.status(202).send('Success')
        }
      }
    } catch (error) {
    console.error(error) 
    res.status(204).send()
    }
  }
  

})

router.post('/resetpassword', (req, res) => {

})


module.exports = router