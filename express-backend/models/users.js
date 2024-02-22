'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User_Data }) {
      // user => user_data 1:1
      Users.hasOne(User_Data, { foreignKey: 'user_id' });
      // user => user_Roster 1:Many
      Users.hasMany(User_Roster, { foreignKey: 'user_id' });

      
    }
  }
  Users.init({
    user_name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    first_name: {
      type: DataTypes.STRING,
      
    },
    last_name: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    salt: {
      type: DataTypes.STRING,
      allowNull: false, 
    },
    password_hash: {
      type: DataTypes.STRING,
      allowNull: false, 
    },
    role: {
      type: DataTypes.ENUM('basic', 'vip', 'admin'),
      allowNull: false,
      defaultValue: 'basic' 
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
    modelName: 'Users',
    timestamps: true
  });
  return Users;
};