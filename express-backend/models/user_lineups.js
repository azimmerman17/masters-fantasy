'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User_Lineups extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // user => user_lineups 1:many
      User_Lineups.belongsTo(Users, { foreignKey: 'user_id' })
      // user_roster => user_lineups 1:many
      User_Lineups.belongsTo(UserRoster, { foreignKey: 'roster_id' })
    }
  }
  User_Lineups.init({
    user_id: {
      allowNull: false,
      unique: true,
      type: DataTypes.INTEGER
    },
    user_id: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    roster_id: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    year: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    round: {
      type: DataTypes.INTEGER,
    },
    player1: {
      type: DataTypes.INTEGER,
    },
    player2: {
      type: DataTypes.INTEGER,
    },
    player3: {
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
    modelName: 'User_Lineups',
  });
  return User_Lineups;
};