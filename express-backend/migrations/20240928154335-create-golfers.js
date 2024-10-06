'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Golfers', {
      golfer_id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      year: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      status: {
        allowNull: false,
        type: Sequelize.STRING,
        defaultValue: 'P'
      },
      thru: {
        allowNull: false,
        type: Sequelize.STRING,
        defaultValue: '0'
      },
      rnd1: {
        allowNull: true,
        type: Sequelize.INTEGER,
      }, 
      rnd1_sf: { 
        allowNull: true,
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      rnd1_tt: {
        allowNull: true,
        type: Sequelize.INTEGER,
      },
      rnd2: {
        allowNull: true,
        type: Sequelize.INTEGER,
      },
      rnd2_sf: {
        allowNull: true,
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      rnd2_tt: {
        allowNull: true,
        type: Sequelize.INTEGER,
      },
      rnd3: {
        allowNull: true,
        type: Sequelize.INTEGER,
      },
      rnd3_sf: {
        allowNull: true,
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      rnd3_tt: {
        allowNull: true,
        type: Sequelize.INTEGER,
      },
      rnd4: {
        allowNull: true,
        type: Sequelize.INTEGER,
      },
      rnd4_sf: {
        allowNull: true,
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      rnd4_tt: {
        allowNull: true,
        type: Sequelize.INTEGER,
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
    await queryInterface.dropTable('Golfers');
  }
};