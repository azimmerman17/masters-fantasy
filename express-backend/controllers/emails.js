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
        let hashedToken = hashValue(token[1]+ decryptedSalt)
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

router.post('/resetpassword', async (req, res) => {
  const { token, changePassword, confirmPassword } = req.body
  // console.log(token, changePassword, confirmPassword)
  // decrypt 
  const decryptedToken = decryptValue(token)
  
  // split the token into arrey for username and guid_token
  const decryptedTokenArrey = decryptedToken.split(',')

  //Get the Salt
  const saltQuery = `SELECT user_id, salt, guid_token, guid_expire FROM public."Users" 
      WHERE user_name = '${decryptedTokenArrey[0]}';`

  try {
    const response = await pool.query(saltQuery)

    const { rows, rowCount, error } = response 
    if (error) res.status(500).send('Unable to validate User')
    else if (rowCount !== 1) res.status(500).send('Unable to validate User')
    else {

      const { salt, guid_token, guid_expire, user_id } = rows[0]
      
      // decrypt the salt from db and hash token
      let decryptedSalt = decryptValue(salt) 
      const hashedToken = hashValue(decryptedTokenArrey[1] + decryptedSalt)

      // validate tokens match, passwords match, and token has not expired
      if (hashedToken !== guid_token || changePassword !== confirmPassword || new Date(guid_expire) < new Date()) {
        console.log(hashedToken !== guid_token, changePassword !== confirmPassword, new Date(guid_expire) < new Date())
        res.status(400).send('Pasword update failed')
      }
      else {
        // hash the new password
        const hashedPassword = hashValue(changePassword + decryptedSalt)
        
        // update the password -- revalidate the token and expiration, set expiration to NOW() to eliminate reuse
        let passwordResetQuery = `UPDATE public."Users"
        SET updated_at = NOW(),
          password_hash = '${hashedPassword}',
          guid_expire = NOW()
        WHERE user_id = ${user_id}
        AND guid_token = '${guid_token}'
        AND guid_expire > NOW();`
        
        const updateResponse = await pool.query(passwordResetQuery)
        // if failed send reponse to user
        if (updateResponse.error) res.status(500).send('Password Update Unsuccessful')
        else if(updateResponse.rowCount === 0) res.status(400).send('Password Update Unsuccessful')
        // success log user in or redirect to login page?
        else res.status(202).send('Password Update Successful')
      }
    }
  } catch (error) {
    console.error(error)
    res.status(500).send('Password Update Failed')
  }
  
 

})


module.exports = router