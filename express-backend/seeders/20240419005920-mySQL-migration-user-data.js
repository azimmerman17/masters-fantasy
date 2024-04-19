'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const { pgPool, mysqlPool } = require('../models/db')
    // Get Postgres Table
    const pgQuery = `SELECT A.user_name, B.* FROM "Users" A, "User_Data" B
      WHERE A.user_id = B.user_id
      ORDER BY A.user_id`

    try {
      let pgResponse = await pgPool.query(pgQuery)
      let { rows } = pgResponse

      // Get mySQL User Data
      let mysqlQuery = `SELECT user_id, user_name FROM \`Users\` ORDER BY user_id`
      const [results, metadata] = await mysqlPool.query(mysqlQuery)

      // Create Array for migration
      let user_data = []

      rows.forEach(row => {
        const { user_name, appearances, wins, best_finish, low_score, created_at, updated_at } = row
        let user_id
        for (let i = 0; i < results.length; i++) {
          if (results[i].user_name === user_name) {
            user_id = results[i].user_id
            break
          }
        }
        user_data.push({
          user_id,
          appearances,
          wins,
          best_finish,
          low_score,
          created_at: new Date(created_at),
          updated_at: new Date(updated_at)
        })
      })
      return await queryInterface.bulkInsert('User_Data', user_data);
    } catch (error) {
      console.error(error)
      return error
    }
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('User_Data', null, {});

  }
};
