'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User_Data extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Users }) {
      // user => user_data 1:1
      User_Data.belongsTo(Users, { foreignKey: 'user_id' })
    }
  }
  User_Data.init({
    user_id: {
      allowNull: false,
      unique: true,
      type: DataTypes.INT
    },
    appearances: {
      allowNull: false,
      type: DataTypes.INT,
      default: 0
    },
    wins: {
      allowNull: false,
      type: DataTypes.INT,
      default: 0
    }, 
    best_finish: {
      type: DataTypes.CHAR
    },
    low_score: {
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
    modelName: 'User_Data',
  });
  return User_Data;
};