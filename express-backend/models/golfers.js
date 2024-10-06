'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Golfers extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Golfers.init({
    id: DataTypes.INTEGER
  }, {
    year: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    status: {
      allowNull: false,
      type: DataTypes.STRING,
      defaultValue: 'P'
    },
    thru: {
      allowNull: false,
      type: DataTypes.STRING,
      defaultValue: '0'
    },
    rnd1: {
      allowNull: true,
      type: DataTypes.INTEGER,
    }, 
    rnd1_sf: { 
      allowNull: true,
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    rnd1_tt: {
      allowNull: true,
      type: DataTypes.INTEGER,
    },
    rnd2: {
      allowNull: true,
      type: DataTypes.INTEGER,
    },
    rnd2_sf: {
      allowNull: true,
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    rnd2_tt: {
      allowNull: true,
      type: DataTypes.INTEGER,
    },
    rnd3: {
      allowNull: true,
      type: DataTypes.INTEGER,
    },
    rnd3_sf: {
      allowNull: true,
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    rnd3_tt: {
      allowNull: true,
      type: DataTypes.INTEGER,
    },
    rnd4: {
      allowNull: true,
      type: DataTypes.INTEGER,
    },
    rnd4_sf: {
      allowNull: true,
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    rnd4_tt: {
      allowNull: true,
      type: DataTypes.INTEGER,
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
  },{
    sequelize,
    modelName: 'Golfers',
  });
  return Golfers;
};