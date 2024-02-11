const crypto = require('crypto');
require('dotenv').config()


const generateSalt = () => {
  const salt = crypto.randomBytes(32)

  return salt.toString('hex')
}

module.exports = generateSalt
