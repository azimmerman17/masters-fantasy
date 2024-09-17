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
        defaultValue: 1
      }, 
      rnd1_lck	: {
        allowNull: true,
        type: Sequelize.DATE,
      },
      rnd2_lck	: {
        allowNull: true,
        type: Sequelize.DATE,
      },
      rnd3_lck	: {
        allowNull: true,
        type: Sequelize.DATE,
      },
      rnd4_lck	: {
        allowNull: true,
        type: Sequelize.DATE,
      }, 
      tourny_actve: {
          allowNull: false,
          type: Sequelize.BOOLEAN,
          defaultValue: false
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
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
      updatedAt: {
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