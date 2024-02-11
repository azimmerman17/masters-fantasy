const express = require('express')
const pool = require('./models/db')
require('dotenv').config()

const app = express()

// MIDDLEWARE 
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))

// Controllers
const userController = require('./controllers/users')

//  Routes
app.use('/user', userController)

// Open Connection andd Listen
const PORT = process.env.PORT || 3000
app.listen(PORT, console.log(`listen ${PORT}`))
