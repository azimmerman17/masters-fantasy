const mysqlPool = require('../models/db')
const calcHoleScore = require('./clacHoleScore')
const calcStablefordScore = require('./calcStablefordScore')

const updateGolfers = async (leaderboard, year, round, tourny_actve) => {
  const { player, pars } = leaderboard
    
    // get pars
    roundPars = pars[`round${round}`]

    // Get players in event
    let golfersQuery = `SELECT * FROM  \`major-fantasy-golf\`.Golfers
      WHERE year = ${year}`

      try {
        const [golfer_list, metadata] = await mysqlPool.query(golfersQuery)
        if (golfer_list.error) {
          console.log('Error: ', golfer_list.error)
        } else if (golfer_list.length < 1) {
          console.log('No Golfers to Update')
        } else {

          // Build Update query
          let updateGolfersQuery = `INSERT INTO \`major-fantasy-golf\`.Golfers (golfer_id, year, status, thru, pos, rnd1, rnd1_sf, rnd1_tt, rnd2, rnd2_sf, rnd2_tt, rnd3, rnd3_sf, rnd3_tt, rnd4, rnd4_sf, rnd4_tt, updated_at)
          VALUES`

          // Loop through list and build update query for the table
          golfer_list.forEach((golfer, i) => {
            const { golfer_id } = golfer
            const golfer_data = player.filter(player => player.id === String(golfer_id))[0]
            let { rnd1, rnd1_sf, rnd1_tt, rnd2, rnd2_sf, rnd2_tt, rnd3, rnd3_sf, rnd3_tt, rnd4, rnd4_sf, rnd4_tt } = golfer
            if (!golfer_data) console.log(golfer_id)
            const { status, thru, epoch, pos } = golfer_data

            // set the current round for golfer
            const currRound = golfer_data[`round${round}`]
            const { roundStatus } = currRound 

            // status P=PreRound, A=Active, C=Cut W=Withdraw F=RoundComplete
            let newStatus
            if (status === 'C' || status === 'W') newStatus = status
            else if (roundStatus === 'Pre') newStatus = 'P'
            else if (roundStatus === 'Finished') newStatus = 'F'
            else newStatus = 'A'

            if (newStatus === 'A' || newStatus === 'F') {
              let currScore = 0
              let currentSfScore = 0
              roundPars.forEach((par, i) =>  {
                let score = calcHoleScore(currRound, round, i)
                if (score) currScore += score - par
                currentSfScore += calcStablefordScore(score - par)
              })

              switch (round) {
                case 1:
                  rnd1 = currScore
                  rnd1_sf = currentSfScore
                  rnd1_tt = epoch
                  break
                case 2:
                  rnd2 = currScore
                  rnd2_sf = currentSfScore
                  rnd2_tt = epoch
                  break
                case 3:
                  rnd3 = currScore
                  rnd3_sf = currentSfScore
                  rnd3_tt = epoch
                  break
                case 4:
                  rnd4 = currScore
                  rnd4_sf = currentSfScore
                  rnd4_tt = epoch
                  break
                default:
                  rnd1_tt = epoch
              }
            }

            updateGolfersQuery = `${updateGolfersQuery} ${i === 0 ? '' : '\n,'} (${golfer_id}, ${year}, '${status}', '${thru}', '${pos}', ${rnd1}, ${rnd1_sf}, ${rnd1_tt}, ${rnd2}, ${rnd2_sf}, ${rnd2_tt}, ${rnd3}, ${rnd3_sf}, ${rnd3_tt}, ${rnd4}, ${rnd4_sf}, ${rnd4_tt},  NOW())`  
          })

          updateGolfersQuery = `${updateGolfersQuery} 
          ON DUPLICATE KEY UPDATE golfer_id=VALUES(golfer_id),
            year=VALUES(year),
            status=VALUES(status),
            thru=VALUES(thru),
            pos=VALUES(pos),
            rnd1=VALUES(rnd1),
            rnd1_sf=VALUES(rnd1_sf),
            rnd1_tt=VALUES(rnd1_tt),
            rnd2=VALUES(rnd2),
            rnd2_sf=VALUES(rnd2_sf),
            rnd2_tt=VALUES(rnd2_tt),
            rnd3=VALUES(rnd3),
            rnd3_sf=VALUES(rnd3_sf),
            rnd3_tt=VALUES(rnd3_tt),
            rnd4=VALUES(rnd4), 
            rnd4_sf=VALUES(rnd4_sf), 
            rnd4_tt=VALUES(rnd4_tt), 
            updated_at=VALUES(updated_at);`

          // Execute the Query
          await mysqlPool.query(updateGolfersQuery)

        }
      } catch (error) {
          console.error(error)
          console.log('Error updating golfers list')
        }
}

module.exports = updateGolfers