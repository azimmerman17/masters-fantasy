'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Fantasy_Config extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Fantasy_Config.init({
    year: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    rnd: {
      allowNull: false,
      type: DataTypes.INTEGER,
      defaultValue: 1
    }, 
    rnd1_lck	: {
      allowNull: true,
      type: DataTypes.DATETIME,
    },
    rnd2_lck	: {
      allowNull: true,
      type: DataTypes.DATETIME,
    },
    rnd3_lck	: {
      allowNull: true,
      type: DataTypes.DATETIME,
    },
    rnd4_lck	: {
      allowNull: true,
      type: DataTypes.DATETIME,
    }, 
    tourny_actve: {
        allowNull: false,
        type: DataTypes.STRING,
        defaultValue: 'P'
    },
    rnd_actve: {
      allowNull: false,
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    Rnd_Actve: {
      allowNull: false,
      type: DataTypes.BOOLEAN,
      defaultValue: false
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
    modelName: 'Fantasy_Config',
  });
  return Fantasy_Config;
};

