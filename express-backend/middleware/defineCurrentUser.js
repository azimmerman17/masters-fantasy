const jwt = require('json-web-token')
require('dotenv').config()

async function defineCurrentUser(req, res, next) {
  try {
    const [ method, token ] = req.headers.authorization.split(' ')
    if (method == 'Bearer'){
      const result = await jwt.decode(process.env.ENCRYPTION_KEY, token)
      const { id } = result.value
      req.currentUser = id
    } 
    next()
  } catch (error) {
    console.error(error)
    req.currentUser = null
    next() 
  }
}

module.exports = defineCurrentUser

