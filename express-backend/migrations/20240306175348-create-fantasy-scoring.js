'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Fantasy_Scoring', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      year: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      holes_completed: {
        allowNull: false,
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      total: {
        allowNull: false,
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      round1: {
        allowNull: false,
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      round2: {
        allowNull: false,
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      round3: {
        allowNull: false,
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      round4: {
        allowNull: false,
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      total_no_bb: {
        allowNull: false,
        type: Sequelize.INTEGER,
        defaultValue: 9999
      },
      round1_no_bb: {
        allowNull: false,
        type: Sequelize.INTEGER,
        defaultValue: 9999
      },
      round2_no_bb: {
        allowNull: false,
        type: Sequelize.INTEGER,
        defaultValue: 999
      },
      round3_no_bb: {
        allowNull: false,
        type: Sequelize.INTEGER,
        defaultValue: 999
      },
      round4_no_bb: {
        allowNull: false,
        type: Sequelize.INTEGER,
        defaultValue: 999
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Fantasy_Scoring');
  }
};