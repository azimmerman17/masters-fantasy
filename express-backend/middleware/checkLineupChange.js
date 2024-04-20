const { mysqlPool } = require('../models/db')

async function checkLineUpChange(user_id, year, new_id, old_id)  {
  // get the user's roster
  const rosterQuery = `SELECT past_champ,
      usa,
      intl,
      wild_card1,
      wild_card2,
      wild_card3,
      id
    FROM \`major-fantasy-golf\`.User_Rosters
    WHERE user_id =${user_id}
      AND year = ${year};`

  try {
    const [rosterResponse, rosterMetadata] = await mysqlPool.query(rosterQuery)
    // if no rows Error in roster creation
    if (rosterResponse.length < 1) console.log('Error roster record does not exist')
    else {
      if (!rosterResponse[0]["past_champ"] || !rosterResponse[0]["usa"] || !rosterResponse[0]["intl"] || !rosterResponse[0]["wild_card1"] || !rosterResponse[0]["wild_card2"] ||!rosterResponse[0]["wild_card3"]) console.log('Roster not complete - No lineup access')
      else {
        // if all 6 are present check for lineups
        let past_champ = rosterResponse[0]["past_champ"]
        let usa = rosterResponse[0]["usa"]
        let intl = rosterResponse[0]["intl"]
        let roster_id = rosterResponse[0]["id"]

        // Full roster check for lineups
        const lineupsQuery = `SELECT round,
            player1,
            player2,
            player3
          FROM  \`major-fantasy-golf\`.User_Lineups
          WHERE user_id = ${user_id} 
            AND year = ${year};`

        // Check for scoring record
        const scoringQuery = `SELECT 'x'
          FROM \`major-fantasy-golf\`.Fantasy_Scoring
          WHERE user_id = ${user_id} 
            AND year = ${year};`

        const [lineupResponse, lineupMetadata] = await mysqlPool.query(lineupsQuery)
        const { rowCount } = lineupResponse
        // if no lineups, create lineups with defaults
        if (lineupResponse.length < 1) {
          //Insert records for each round
          for (let i = 1; i < 5; i++) {
            let insertRoundQuery = `INSERT INTO \`major-fantasy-golf\`.User_Lineups (user_id, roster_id, year, round, player1, player2, player3, created_at, updated_at)
            VALUES (${user_id}, ${roster_id}, ${year}, ${i}, ${past_champ}, ${usa}, ${intl}, NOW(), NOW());`
          
            const [response, metadata] = await mysqlPool.query(insertRoundQuery)
            if (response.error) console.log(`Round ${i} 500 Error - Lineups not saved`)
            else console.log(`Round ${i} - Successfully inserted`)
          }
          // Update the player_ids in lineup from the old id to new id
        } else {
          if (!old_id) console.log('No id present to compare')
          else {
            // change player to newly selected player
            let updateQuery1 = `UPDATE \`major-fantasy-golf\`.User_Lineups SET updated_at = NOW(), player1 = ${new_id}
              WHERE user_id = ${user_id}
                AND year = ${year}
                AND player1 = ${old_id};`

            let updateQuery2 = `UPDATE  \`major-fantasy-golf\`.User_Lineups SET updated_at = NOW(), player2 = ${new_id}
              WHERE user_id = ${user_id}
                AND year = ${year}
                AND player2 = ${old_id};`

            let updateQuery3 = `UPDATE \`major-fantasy-golf\`.User_Lineups SET updated_at = NOW(), player3 = ${new_id}
              WHERE user_id = ${user_id}
                AND year = ${year}
                AND player3 = ${old_id};`

            await mysqlPool.query(updateQuery1)
            await mysqlPool.query(updateQuery2)
            await mysqlPool.query(updateQuery3)
          }
        } // END LINEUPS
        const [scoringResponse, scoringMetadat] = await mysqlPool.query(scoringQuery)
        const scoringRowCount = scoringResponse.length

        if (scoringRowCount < 1) {
          // no current scoring record - create new
          const insertScoringQuery = `INSERT INTO \`major-fantasy-golf\`.User_Lineups (user_id, year, created_at, updated_at)
            VALUES (${user_id}, ${year}, NOW(), NOW());`

          const [response, metadata] = await mysqlPool.query(insertScoringQuery)
          if (response.error) console.log(`Scoring Record 500 Error - Record not created`)
          else console.log(`Scoring Record - Successfully inserted`)
        }
      }
    }  
  } catch (error) {
    console.error(error)
  }
}

module.exports = checkLineUpChange

