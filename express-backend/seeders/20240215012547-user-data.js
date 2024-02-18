'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const pool = require('../models/db')
    const getIdQuery = `SELECT A.user_id FROM public."Users" A`
    try {
      let result = await pool.query(getIdQuery)
      const { rows } = result

      rows.forEach( async (row) => {
        const insertQuery = `INSERT INTO public."User_Data" (user_id, created_at, updated_at)
          VALUES (${row["user_id"]}, NOW(), NOW())`

        await pool.query(insertQuery)
      })
    } catch (error) {
      console.error(error)
    }

  },

  async down (queryInterface, Sequelize) {
await queryInterface.bulkDelete('User_Data');
  }
};
