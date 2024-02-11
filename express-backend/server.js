const express = require('express')
const pool = require('./models/db')
const cors = require('cors')
require('dotenv').config()

const app = express()

// MIDDLEWARE 
app.use(express.static('public'))
app.set('view engine', 'jsx')
app.use(express.json())

app.use(cors())
app.use(express.urlencoded({ extended: true }))

// Controllers
const userController = require('./controllers/users')

//  Routes
app.use('/user', userController)

// Open Connection andd Listen
const PORT = process.env.PORT || 3000
app.listen(PORT, console.log(`listen ${PORT}`))