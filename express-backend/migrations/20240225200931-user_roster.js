'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.changeColumn('User_Rosters', 'past_champ', {
        allowNull: true,
        type: Sequelize.INTEGER
      }),
      queryInterface.changeColumn('User_Rosters', 'usa', {
        allowNull: true,
        type: Sequelize.INTEGER
      }),
      queryInterface.changeColumn('User_Rosters', 'intl', {
        allowNull: true,
        type: Sequelize.INTEGER
      }),
      queryInterface.changeColumn('User_Rosters', 'wild_card1', {
        allowNull: true,
        type: Sequelize.INTEGER
      }),
      queryInterface.changeColumn('User_Rosters', 'wild_card2', {
        allowNull: true,
        type: Sequelize.INTEGER
      }),
      queryInterface.changeColumn('User_Rosters', 'wild_card3', {
        allowNull: true,
        type: Sequelize.INTEGER
      })
    ])
  },
  
  down: (queryInterface, Sequelize) => {
    return Promise.all([
        queryInterface.changeColumn('User_Rosters', 'past_champ'),
        queryInterface.changeColumn('User_Rosters', 'usa'),
        queryInterface.changeColumn('User_Rosters', 'intl'),
        queryInterface.changeColumn('User_Rosters', 'wild_card1'),
        queryInterface.changeColumn('User_Rosters', 'wild_card2'),
        queryInterface.changeColumn('User_Rosters', 'wild_card3')
    ])
  }
}
