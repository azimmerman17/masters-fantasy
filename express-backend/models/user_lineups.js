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
      type: DataTypes.INT
    },
    user_id: {
      allowNull: false,
      type: DataTypes.INT
    },
    roster_id: {
      allowNull: false,
      type: DataTypes.INT
    },
    year: {
      allowNull: false,
      type: DataTypes.INT,
    },
    round: {
      type: DataTypes.INT,
    },
    player1: {
      type: DataTypes.INT,
    },
    player2: {
      type: DataTypes.INT,
    },
    player3: {
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
    modelName: 'User_Lineups',
  });
  return User_Lineups;
};