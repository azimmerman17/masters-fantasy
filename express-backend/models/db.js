const { Pool } = require('pg')

require('dotenv').config()

const connectionString = process.env.DB_URI

const pool = new Pool({
  connectionString,
  max: 4,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000
})

module.exports = pool