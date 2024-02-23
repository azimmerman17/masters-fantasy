const express = require('express')
const pool = require('./models/db')
const cors = require('cors')
require('dotenv').config()
const defineCurrentUser = require('./middleware/defineCurrentUser')


const app = express()

// MIDDLEWARE 
app.use(express.static('public'))
app.set('view engine', 'jsx')
app.use(express.json())
app.use(defineCurrentUser)
app.use(cors())
app.use(express.urlencoded({ extended: true }))

// Controllers
const userController = require('./controllers/users')
const authController = require('./controllers/authentication')
const rosterController= require('./controllers/roster')

//  Routes
app.use('/user', userController)
app.use('/auth', authController)
app.use('/roster', rosterController)


// Open Connection andd Listen
const PORT = process.env.PORT || 3000
app.listen(PORT, console.log(`listen ${PORT}`))
