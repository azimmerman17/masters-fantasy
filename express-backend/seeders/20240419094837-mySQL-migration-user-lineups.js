'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const { pgPool, mysqlPool } = require('../models/db')
    // Get Postgres Table
    const pgQuery = `SELECT A.user_name, B.* FROM "Users" A, "User_Lineups" B
      WHERE A.user_id = B.user_id
      ORDER BY A.user_id`

    try {
      let pgResponse = await pgPool.query(pgQuery)
      let { rows } = pgResponse

      // Get mySQL User Data
      let mysqlQuery = `SELECT A.user_id, A.user_name, B.id as "roster_id", B.year FROM \`Users\` A, \`User_Rosters\` B 
        WHERE A.user_id = B.user_id
        ORDER BY user_id`
      const [results, metadata] = await mysqlPool.query(mysqlQuery)

      // Create Array for migration
      let user_lineups = []

      rows.forEach(row => {
        const { user_name, year, round, player1, player2, player3, created_at, updated_at } = row
        let user_id
        let roster_id
        for (let i = 0; i < results.length; i++) {
          if (results[i].user_name === user_name && results[i].year === year) {
            user_id = results[i].user_id
            roster_id = results[i].roster_id
            break
          }
        }
        user_lineups.push({
          user_id,
          roster_id,
          year,
          round,
          player1,
          player2,
          player3,
          created_at: new Date(created_at),
          updated_at: new Date(updated_at)
        })
      })
      return await queryInterface.bulkInsert('User_Lineups', user_lineups);
    } catch (error) {
      console.error(error)
      return error
    }
  },

  async down (queryInterface, Sequelize) {
    return await queryInterface.bulkDelete('User_Lineups', null, {});
  }
};