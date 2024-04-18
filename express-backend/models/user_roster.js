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
      // user_roster => user_lineups 1:Many
      User_Roster.hasMany(User_Lineups, { foreignKey: 'roster_id' })
    }
  }
  User_Roster.init({
    user_id: {
      allowNull: false,
      unique: true,
      type: DataTypes.INT
    },
    year: {
      allowNull: false,
      type: DataTypes.INT,
    },
    past_champ: {
      allowNull: true,
      type: DataTypes.INT
    },
    usa: {
      allowNull: true,
      type: DataTypes.INT,
    },
    intl: {
      allowNull: true,
      type: DataTypes.INT,
    },
    wild_card1: {
      allowNull: true,
      type: DataTypes.INT,
    },
    wild_card2: {
      allowNull: true,
      type: DataTypes.INT,
    },
    wild_card3: {
      allowNull: true,
      type: DataTypes.INT,
    },
    created_at: {
      type: DataTypes.TIMESTAMP,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    updated_at: {
      type: DataTypes.TIMESTAMP,
      allowNull: false,
      defaultValue: DataTypes.NOW
    }
  }, {
    sequelize,
    modelName: 'User_Roster',
  });
  return User_Roster;
};