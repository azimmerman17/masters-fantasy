'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn(
        'Fantasy_Scoring', 
        'holes_display',
          {
            allowNull: false,
            type: Sequelize.STRING,
            defaultValue: '0'
          }
      ),
      queryInterface.addColumn(
        'Fantasy_Scoring', 
        'display_round',
          {
            allowNull: false,
            type: Sequelize.INTEGER,
            defaultValue: 1
          }
      ),
      queryInterface.addColumn(
        'Fantasy_Scoring', 
        'seq_num',
        {
          allowNull: true,
          type: Sequelize.STRING,
        }
      ),
    ])
  },

  async down (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.removeColumn('Fantasy_Scoring','holes_display'),
      queryInterface.removeColumn('Fantasy_Scoring', 'display_round'),
      queryInterface.removeColumn('Fantasy_Scoring', 'seq_num'),
    ]);
  }
};
