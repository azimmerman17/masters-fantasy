'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return Promise.all([
      // queryInterface.addColumn(
      //   'Fantasy_Scoring', 
      //   'round1_sf',
      //   {
      //     allowNull: false,
      //     type: Sequelize.INTEGER,
      //     defaultValue: 0
      // }),
      // queryInterface.addColumn(
      //   'Fantasy_Scoring', 
      //   'round2_sf',
      //   {
      //   allowNull: false,
      //   type: Sequelize.INTEGER,
      //   defaultValue: 0
      // }),
      // queryInterface.addColumn(
      //   'Fantasy_Scoring', 
      //   'round3_sf',
      //   {
      //   allowNull: false,
      //   type: Sequelize.INTEGER,
      //   defaultValue: 0
      // }),
      queryInterface.addColumn(
        'Fantasy_Scoring', 
        'round4_sf',
        {
        allowNull: false,
        type: Sequelize.INTEGER,
        defaultValue: 0
      }),
    ])
  },

  async down (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.removeColumn('Fantasy_Scoring','round1_sf'),
      queryInterface.removeColumn('Fantasy_Scoring', 'round2_sf'),
      queryInterface.removeColumn('Fantasy_Scoring', 'round3_sf'),
      queryInterface.removeColumn('Fantasy_Scoring', 'round4_sf'),
    ]);
  }
};

