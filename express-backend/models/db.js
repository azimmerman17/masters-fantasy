const { Pool } = require('pg')

require('dotenv').config()

const connectionString = process.env.DB_URI

const pool = new Pool({
  connectionString,
  max: 4,
  idleTimeoutMillis: 100,
  connectionTimeoutMillis: 10000
})

module.exports = pool