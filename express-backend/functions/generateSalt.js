const crypto = require('crypto');
require('dotenv').config()


const generateSalt = (num) => {
  const salt = crypto.randomBytes(num)

  return salt.toString('hex')
}

module.exports = generateSalt
