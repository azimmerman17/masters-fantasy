const router = require('express').Router()
require('dotenv').config()
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
      else if (!currYearResponse.posted)  res.status(400).send('Cannot created new event, until previous event is posted')
      // Don't allow a second event in the same calendar year
      else if (currYearResponse.year === year) res.status(400).send('Event already created for this calendar year')
      // Add New Config row
      else {
        const createConfig = `INSERT INTO \`major-fantasy-golf\`.Fantasy_Config (year, created_at, updated_at)
          VALUES (${year}, NOW(), NOW());`
        
          let [response, metadata] = await mysqlPool.query(createUser)
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
router.post('/:year', async (req, res) => {
  const { year } = req.params
  // get variables from req body
  const {round, round1Lock, round2Lock, round3Lock, round4Lock, tournyActive, roundActive, posted } = req.body 
  
  // build query
  let updateConfig = `UPDATE \`major-fantasy-golf\`.Fantasy_Config
  SET updated_at = NOW()
  ${round ? `, rnd = ${round}` : ''}
  ${round1Lock ? `, rnd1_lck = ${round1Lock}` : ''}
  ${round2Lock ? `, rnd2_lck = ${round2Lock}` : ''}
  ${round3Lock ? `, rnd3_lck = ${round3Lock}` : ''}
  ${round4Lock ? `, rnd4_lck = ${round4Lock}` : ''}
  ${tournyActive ? `, tourney_actve = ${tournyActive}` : ''}
  ${roundActive ? `, rnd_actve = ${roundActive}` : ''}
  ${posted ? `, posted = ${posted}` : ''}
  WHERE year = ${year};`
 
  try {
    const [response, metadata] = await mysqlPool.query(updateConfig)
    if (response.error) res.status(500).send({msg: 'Error - Config update Failed'})
    else res.status(201).send({msg: 'Config Updated'})
  } catch (error) {
    console.error(error)
    res.status(500).send({msg: 'Error - Config update Failed'})
  }
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
