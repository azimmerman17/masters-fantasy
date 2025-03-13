'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const { pgPool, mysqlPool } = require('../models/db')
    // Get Postgres Table
    const pgQuery = `SELECT A.user_name, B.* FROM "Users" A, "User_Rosters" B
      WHERE A.user_id = B.user_id
      ORDER BY A.user_id`

    try {
      let pgResponse = await pgPool.query(pgQuery)
      let { rows } = pgResponse

      // Get mySQL User Data
      let mysqlQuery = `SELECT user_id, user_name FROM \`Users\` ORDER BY user_id`
      const [results, metadata] = await mysqlPool.query(mysqlQuery)

      // Create Array for migration
      let user_rosters = []

      rows.forEach(row => {
        const { user_name, year, past_champ, usa, intl,  wild_card1, wild_card2,  wild_card3, created_at, updated_at } = row
        let user_id
        for (let i = 0; i < results.length; i++) {
          if (results[i].user_name === user_name) {
            user_id = results[i].user_id
            break
          }
        }
        user_rosters.push({
          user_id,
          year,
          past_champ,
          usa,
          intl,
          wild_card1,
          wild_card2,
          wild_card3,
          created_at: new Date(created_at),
          updated_at: new Date(updated_at)
        })
      })
      return await queryInterface.bulkInsert('User_Rosters', user_rosters);
    } catch (error) {
      console.error(error)
      return error
    }
  },

  async down (queryInterface, Sequelize) {
    return await queryInterface.bulkDelete('User_Rosters', null, {});
  }
};
