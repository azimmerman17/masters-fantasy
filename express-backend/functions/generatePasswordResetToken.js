const generateSalt = require('./generateSalt')

require('dotenv').config()

const generatePasswordResetToken = async (user) => {
  // use Salt generaton function to create a token
  return [user, generateSalt(64)]
}

module.exports = generatePasswordResetToken