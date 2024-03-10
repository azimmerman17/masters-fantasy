const express = require('express')
const pool = require('./models/db')
const cors = require('cors')
require('dotenv').config()
const defineCurrentUser = require('./middleware/defineCurrentUser')
const updateScores = require('./middleware/updateScores')


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
const rosterController = require('./controllers/roster')
const lineupsController = require('./controllers/lineups')
const fantasyScoringController = require('./controllers/fantasy_scoring')

//  Routes
app.use('/user', userController)
app.use('/auth', authController)
app.use('/roster', rosterController)
app.use('/lineups', lineupsController)
app.use('/scoring', fantasyScoringController)


// Open Connection andd Listen
const PORT = process.env.PORT || 3000
app.listen(PORT, console.log(`listen ${PORT}`))
