// const { Pool } = require('pg')
const Sequelize = require('sequelize')
const mysql2  = require('mysql2')

require('dotenv').config()

const connectionString = process.env.MYSQL_URI

// const pgPool = new Pool({
//   connectionString,
//   max: 4,
//   idleTimeoutMillis: 500,
//   connectionTimeoutMillis: 10000
// })
// (process.env.MYSQL_DATABASE, process.env.MYSQL_USERNAME, process.env.MYSQL_PASSWORD

const mysqlPool = new Sequelize(connectionString, {
  host: process.env.MYSQL_HOST,
  port: process.env.MYSQL_PORT,
  username: process.env.MYSQL_USERNAME,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  ssl: true,
  dialect: 'mysql',
  dialectModule: mysql2,
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 1000
  },
});

module.exports = mysqlPool
// module.exports = { pgPool, mysqlPool}