'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('User_Lineups', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        allowNull: false,
        unique: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      roster_id: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      year: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      round: {
        type: Sequelize.INTEGER,
      },
      player1: {
        type: Sequelize.INTEGER,
      },
      player2: {
        type: Sequelize.INTEGER,
      },
      player3: {
        type: Sequelize.INTEGER,
      },
  
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('User_Lineups');
  }
};