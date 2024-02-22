'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    const getYear = () => {
      let date = new Date()
      return date.getFullYear()
    }

    await queryInterface.createTable('User_Rosters', {
      id: {
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
      year: {
        allowNull: false,
        type: Sequelize.INTEGER,
        defaultValue: getYear()
      },
      past_champ: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      usa: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      intl: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      wild_card1: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      wild_card2: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      wild_card3: {
        allowNull: false,
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
    await queryInterface.dropTable('User_Rosters');
  }
};