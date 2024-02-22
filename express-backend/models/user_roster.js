'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User_Roster extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // user => user_data 1:Many
      User_Roster.belongsTo(Users, { foreignKey: 'user_id' })
    }
  }
  User_Roster.init({
    user_id: {
      allowNull: false,
      unique: true,
      type: DataTypes.INTEGER
    },
    year: {
      allowNull: false,
      type: DataTypes.INTEGER,
      defaultValue: (new Date()).getFullYear()
    },
    past_champ: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    usa: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    intl: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    wild_card1: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    wild_card2: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    wild_card3: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    }
  }, {
    sequelize,
    modelName: 'User_Roster',
  });
  return User_Roster;
};