'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // get the PostgreSQL and mySQL db connection
    const { pgPool } = require('../models/db') //POSTGRES

    // Users Table From PG
    let usersQuery = `SELECT * FROM "Users" ORDER BY user_id`
    
    try {
      let usersResponse = await pgPool.query(usersQuery)
      let { rows } = usersResponse

      // Create data array for Sequilize 
      let users = []
      rows.forEach(row => {
        const { user_name, first_name, last_name, email, salt, password_hash, role, created_at, updated_at, guid_token, guid_expire } = row
        
        users.push({
          user_name,
          first_name,
          last_name,
          email,
          salt,
          password_hash,
          role,
          created_at: new Date(created_at),
          updated_at: new Date(updated_at),
          guid_token,
          guid_expire: new Date()
        })
      })
      return await queryInterface.bulkInsert('Users', users);
    } catch (error) {
      console.error(error)
      return error
    }
  },
  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
