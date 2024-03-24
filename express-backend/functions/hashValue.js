const crypto = require('crypto');
require('dotenv').config()

const hashValue = (value) => {
  const key = process.env.ENCRYPTION_KEY

  //Calling createHash method
  const hash = crypto.createHash('sha256', key)
    // updating data
    .update(value)
 
    // Encoding to be used
    .digest('hex');

    return hash
}

module.exports = hashValue
