'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn(
        'Users', 
        'guid_token',
        {
          type: Sequelize.STRING,
          allowNull: true,
        },
      ),
      queryInterface.addColumn(
        'Users', 
        'guid_expire',
        {
          type: Sequelize.DATE,
          allowNull: true,
        },
      ),
    ])
  },

  async down (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.removeColumn('Users', 'guid_token'),
      queryInterface.removeColumn('Users', 'guid_expire'),
    ])
  }
};
