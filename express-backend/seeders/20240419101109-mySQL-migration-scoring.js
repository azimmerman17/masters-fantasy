'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const { pgPool, mysqlPool } = require('../models/db')
    // Get Postgres Table
    const pgQuery = `SELECT A.user_name, B.* FROM "Users" A, "Fantasy_Scoring" B
      WHERE A.user_id = B.user_id
      ORDER BY A.user_id`

    try {
      let pgResponse = await pgPool.query(pgQuery)
      let { rows } = pgResponse

      // Get mySQL User Data
      let mysqlQuery = `SELECT user_id, user_name FROM \`Users\` ORDER BY user_id`
      const [results, metadata] = await mysqlPool.query(mysqlQuery)

      // Create Array for migration
      let fantasy_Scoring = []

      rows.forEach(row => {
        const { user_name, year, holes_completed, round1, round2, round3, round4, round1_aggr, round2_aggr, round3_aggr, round4_aggr, holes_display, display_round, seq_num, created_at, updated_at } = row
        let user_id
        for (let i = 0; i < results.length; i++) {
          if (results[i].user_name === user_name) {
            user_id = results[i].user_id
            break
          }
        }
        fantasy_Scoring.push({
          user_id,
          year,
          holes_completed,
          round1,
          round2,
          round3,
          round4,
          round1_aggr,
          round2_aggr,
          round3_aggr,
          round4_aggr,
          holes_display,
          display_round,
          seq_num,
          created_at: new Date(created_at),
          updated_at: new Date(updated_at)
        })
      })

      return await queryInterface.bulkInsert('Fantasy_Scoring', fantasy_Scoring);
    } catch (error) {
      console.error(error)
      return error
    }
  },

  async down (queryInterface, Sequelize) {
    return await queryInterface.bulkDelete('Fantasy_Scoring', null, {});
  }
};