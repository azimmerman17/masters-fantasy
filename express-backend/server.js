const express = require('express')
const pool = require('./models/db')
const bodyParser = require('body-parser');
const cors = require('cors')
require('dotenv').config()
const defineCurrentUser = require('./middleware/defineCurrentUser')


const app = express()

// MIDDLEWARE 
app.use(express.static('public'))
app.set('view engine', 'jsx')
app.use(defineCurrentUser)
app.use(cors())
//   {
//   "origin": '*',
//   "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
//   // "preflightContinue": false,
//   // "optionsSuccessStatus": 204
// }))
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
// app.use(express.json())
// app.use(express.urlencoded({limit: '50mb', extended: true }))

// Controllers
const userController = require('./controllers/users')
const authController = require('./controllers/authentication')
const rosterController = require('./controllers/roster')
const lineupsController = require('./controllers/lineups')
const fantasyScoringController = require('./controllers/fantasy_scoring')
const emailsController = require('./controllers/emails')
const configController = require('./controllers/fantasy_config')
const catchAllController = require('./controllers/catch_all')

//  Routes
app.use('/user', userController)
app.use('/auth', authController)
app.use('/roster', rosterController)
app.use('/lineups', lineupsController)
app.use('/scoring', fantasyScoringController)
app.use('/email', emailsController)
app.use('/admin', configController)
app.use('/*', catchAllController)


// Open Connection andd Listen
const PORT = process.env.PORT
app.listen(PORT, console.log(`listen ${PORT}`))
