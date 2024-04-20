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
      // user => user_lineups 1:Many
      Users.hasMany(User_Lineups, { foreignKey: 'user_id' });
      // user => fantasy_scoring 1:many
      Users.hasMany(Fantasy_Scoring, { foreignKey: 'user_id' })

    }
  }
  Users.init({
    user_name: {
      type: DataTypes.CHAR,
      unique: true,
      allowNull: false,
    },
    first_name: {
      type: DataTypes.CHAR,
      
    },
    last_name: {
      type: DataTypes.CHAR,
    },
    email: {
      type: DataTypes.CHAR,
      allowNull: false,
      unique: true,
    },
    salt: {
      type: DataTypes.CHAR,
      allowNull: false, 
    },
    password_hash: {
      type: DataTypes.CHAR,
      allowNull: false, 
    },
    role: {
      type: DataTypes.CHAR,
      allowNull: false,
      defaultValue: 'basic' 
    },
    guid_token: {
      type: DataTypes.CHAR,
      allowNull: true, 
    },
    guid_expire: {
      type: DataTypes.TIMESTAMP,
      allowNull: true, 
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
    modelName: 'Users',
    timestamps: true
  });
  return Users;
};