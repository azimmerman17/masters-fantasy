'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.removeColumn('Fantasy_Scoring','total'),
      queryInterface.removeColumn('Fantasy_Scoring', 'total_no_bb'),
      queryInterface.renameColumn('Fantasy_Scoring', 'round1_no_bb', 'round1_aggr'),
      queryInterface.renameColumn('Fantasy_Scoring', 'round2_no_bb', 'round2_aggr'),
      queryInterface.renameColumn('Fantasy_Scoring', 'round3_no_bb', 'round3_aggr'),
      queryInterface.renameColumn('Fantasy_Scoring', 'round4_no_bb', 'round4_aggr'),
    ]);
  },

  async down (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn(
        'Fantasy_Scoring',
        'total',
        {
          allowNull: false,
          type: Sequelize.INTEGER,
          defaultValue: 0
          }
      ),
      queryInterface.addColumn(
        'Fantasy_Scoring',
        'total_no_bb',
        {
          allowNull: false,
          type: Sequelize.INTEGER,
          defaultValue: 9999
          }
        
      ),
      queryInterface.renameColumn('Fantasy_Scoring', 'round1_aggr', 'round1_no_bb'),
      queryInterface.renameColumn('Fantasy_Scoring', 'round2_aggr', 'round2_no_bb'),
      queryInterface.renameColumn('Fantasy_Scoring', 'round3_aggr', 'round3_no_bb'),
      queryInterface.renameColumn('Fantasy_Scoring', 'round4_aggr', 'round4_no_bb'),
    ])
  }
};
