'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Fantasy_Config', {
      year: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      rnd: {
        allowNull: false,
        type: Sequelize.INTEGER,
        defaultValue: 0
      }, 
      rnd1_lck	: {
        allowNull: true,
        type: Sequelize.INTEGER,
      },
      rnd2_lck	: {
        allowNull: true,
        type: Sequelize.INTEGER,
      },
      rnd3_lck	: {
        allowNull: true,
        type: Sequelize.INTEGER,
      },
      rnd4_lck	: {
        allowNull: true,
        type: Sequelize.INTEGER,
      }, 
      tourny_actve: {
          allowNull: false,
          type: Sequelize.CHAR(1),
          defaultValue: 'P'
      },
      rnd_actve: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      posted: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        defaultValue: false
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
    await queryInterface.dropTable('Fantasy_Config');
  }
};