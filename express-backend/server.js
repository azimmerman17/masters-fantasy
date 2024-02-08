const express = require('express')
require('dotenv').config()

const app = express()

// MIDDLEWARE 
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))

// Controllers


//  Routes

// 
const PORT = process.env.PORT || 3000
app.listen(PORT, console.log(`listen ${PORT}`))
