const router = require('express').Router()
require('dotenv').config()
const formatDateTime = require('../functions/formatDateTime')
const { mysqlPool } = require('../models/db')

// Functions

// GET
// GET ALL YEAR
router.get('/', async (req,res) => {
  const getConfigs = `SELECT * FROM  \`major-fantasy-golf\`.Fantasy_Config;`
  
  try {
    const [response, metadata] = await mysqlPool.query(getConfigs)
    if (response.error) res.status(500).send({response})
    else res.status(200).send(response)
  } catch (error) {
    res.status(500).send(error)
  }
})

//GET CURRENT YEAR
router.get('/current', async (req,res) => {
  const getConfig = `SELECT A.* FROM \`major-fantasy-golf\`.Fantasy_Config A
    WHERE year = (SELECT MAX(A1.year) FROM  \`major-fantasy-golf\`.Fantasy_Config A1
      WHERE A.year = A1.year);`
  
  try {
    const [response, metadata] = await mysqlPool.query(getConfig)
    if (response.error) res.status(500).send({response})
    else res.status(200).send(response)
  } catch (error) {
    res.status(500).send(error)
  }
})

//GET SPECIFIC YEAR
router.get('/:year', async (req,res) => {
  const { year } = req.params

  const getConfig = `SELECT * FROM  \`major-fantasy-golf\`.Fantasy_Config A
    WHERE year = ${year}`
  
  try {
    const [response, metadata] = await mysqlPool.query(getConfig)
    if (response.error) res.status(500).send({response})
    else res.status(200).send(response)
  } catch (error) {
    res.status(500).send(error)
  }
})

//POST
// CREATE NEW EVENT
router.post('/new', async (req, res) => {
  // Get current year
  let year = new Date().getFullYear()
  // Check for latest year
  const currYear =  `SELECT year, posted FROM\`major-fantasy-golf\`.Fantasy_Config A
  WHERE year = (SELECT MAX(A1.year) FROM  \`major-fantasy-golf\`.Fantasy_Config A1
    WHERE A.year = A1.year);`

    try {
      const [currYearResponse, metadata] = await mysqlPool.query(currYear)
      if (currYearResponse.error) res.status(500).send({currYearResponse})
      // Don't allow new round until old round is posted
      else if (currYearResponse.posted == 0)  res.status(400).send('Cannot created new event, until previous event is posted')
      // Don't allow a second event in the same calendar year
      else if (currYearResponse.year === year) res.status(400).send('Event already created for this calendar year')
      // Add New Config row
      else {
        const createConfig = `INSERT INTO \`major-fantasy-golf\`.Fantasy_Config (year, created_at, updated_at)
          VALUES (${year}, NOW(), NOW());`
        
          let [response, metadata] = await mysqlPool.query(createConfig)
        if (response.error) res.status(500).send({response})
        else {
          res.status(201).send('Config row created')
        }    
      }
    } catch (error) {
      res.status(500).send(error)
    }
  })

// PUT 
// UPDATE EVENT CONFIG
router.put('/:year', async (req, res) => {
  const { year } = req.params
  // get variables from req body
  let {currentRound, round1Lock, round2Lock, round3Lock, round4Lock, tourny_active, round_active, posted } = req.body 
   
  if (tourny_active === 'P' || tourny_active === 'F') round_active = tourny_active

  // build + run query
  const response = await updateConfig(rnd, tourny_active, round_active, round1Lock, round2Lock, round3Lock, round4Lock, posted, year)
  
  if (response.status === 'Success') res.status(201).send({msg: 'Config Updated'})
  else res.status(500).send({msg: 'Error - Config update Failed'})
})

//DELETE
// DELETE ALL PAST EVENTS - 
router.delete('/', async (req, res) => {
  const currYear = new Date().getFullYear()
  let removeConfigs = `DELETE FROM \`major-fantasy-golf\`.Fantasy_Config
  WHERE year < ${currYear} 
  AND tourny_active = 'F'
  AND posted <> 0;`
  
  try {
      await mysqlPool.query(removeConfigs)
    res.status(200).send('Configurations Removed')
  } catch (error) {
    console.error(error)
    res.status(500).send(error)
  }
})

// DELETE SPECIFIC EVENT
router.delete('/:year', async (req, res) => {
  const { year } = req.params
  let removeConfig = `DELETE FROM \`major-fantasy-golf\`.Fantasy_Config
  WHERE year = ${year} 
  AND tourny_active <> 'A' -- Cannot Delete Active Event
  OR (tourny_active = 'F'
    AND posted <> 0);`
  
})

module.exports = router
