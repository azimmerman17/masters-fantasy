'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('User_Data', {
      user_data_id: {
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
      appearances: {
        allowNull: false,
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      wins: {
        allowNull: false,
        type: Sequelize.INTEGER,
        defaultValue: 0
      }, 
      best_finish: {
        type: Sequelize.STRING
      },
      low_score: {
        type: Sequelize.INTEGER,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('User_Data');
  }
};