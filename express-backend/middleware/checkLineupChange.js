const pool = require('../models/db')

async function checkLineUpChange(user_id, year, new_id, old_id)  {
  console.log(user_id, year, new_id, old_id)

  // get the user's roster
  const rosterQuery = `SELECT A.past_champ,
      A.usa,
      A.intl,
      A.wild_card1,
      A.wild_card2,
      A.wild_card3
    FROM public."User_Rosters" A
    WHERE user_id =${user_id}
      AND A.year = ${year};`

  try {
    const rosterResponse = await pool.query(rosterQuery)
    const { rows, rowCount } = rosterResponse
    // if no rows Error in roster creation
    if (rowCount < 1) console.log('Error roster record does not exist')
    else {
      if (!rows[0]["past_champ"] || !rows[0]["usa"] || !rows[0]["intl"] || !rows[0]["wild_card1"] || !rows[0]["wild_card2"] ||!rows[0]["wild_card3"]) console.log('Roster not complete - No lineup access')
      else {
        // if all 6 are present check for lineups
        let past_champ = rows[0]["past_champ"]
        let usa = rows[0]["usa"]
        let intl = rows[0]["intl"]

        // Full roster check for lineups
        const lineupsQuery = `SELECT A.round,
            A.player1,
            A.player2,
            A.player3
          FROM public."User_Lineups" A
          WHERE A.user_id = ${user_id} 
            AND A.year = ${year};`

        const lineupResponse = await pool.query(lineupsQuery)
        const { rowCount } = lineupResponse
        // if no lineups, create lineups with defaults
        if (rowCount < 1) {
          //Insert records for each round
          for (let i = 1; i < 5; i++) {
            let insertRoundQuery = `INSERT INTO public."User_Lineups" (user_id, roster_id, year, round, player1, player2, player3, created_at, updated_at)
            VALUES (${user_id}, ${roster_id}, ${year}, ${i}, ${past_champ}, ${usa}, ${intl}, NOW(), NOW());`
          
            const response = await pool.query(insertRoundQuery)
            if (response.error) console.log(`Round ${i} 500 Error - Lineups not saved`)
            else console.log(`Round ${i} - Successfully inserted`)
          }
          // Update the player_ids in lineup from the old id to new id
        } else {
          if (!old_id) console.log('No id present to compare')
          else {
            // change player to newly selected player
            let updateQuery1 = `UPDATE public."User_Lineups" SET updated_at = NOW(), player1 = ${new_id}
              WHERE user_id = ${user_id}
                AND year = ${year}
                AND player1 = ${old_id};`

            let updateQuery2 = `UPDATE public."User_Lineups" SET updated_at = NOW(), player2 = ${new_id}
              WHERE user_id = ${user_id}
                AND year = ${year}
                AND player2 = ${old_id};`

            let updateQuery3 = `UPDATE public."User_Lineups" SET updated_at = NOW(), player3 = ${new_id}
              WHERE user_id = ${user_id}
                AND year = ${year}
                AND player3 = ${old_id};`

            await pool.query(updateQuery1)
            await pool.query(updateQuery2)
            await pool.query(updateQuery3)
          }
        }
      }
    }  
  } catch (error) {
    console.error(error)
  }
}

module.exports = checkLineUpChange

