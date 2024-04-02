const router = require('express').Router()

router.get('/', (req,res) => {
  res.send('No Route Found')
})

router.post('/', (req,res) => {
  res.send('No Route Found')
})

router.put('/', (req,res) => {
  res.send('No Route Found')
})

router.delete('/', (req,res) => {
  res.send('No Route Found')
})

module.exports = router