const router = require('express').Router()
require('dotenv').config()
const pool = require('../models/db')

// ONLY POST routes
// Forgot Password Reset
router.post('/forgotpassword', (req, res) => {
  // pass in user_name or email
  
  // create reset password token a hash in Db - expires in up to a day

  // send email to user encrypt username, token, and 

})

router.post('/resetpassword', (req, res) => {

})


module.exports = router