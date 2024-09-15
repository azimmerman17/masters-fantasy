'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Fantasy_Scoring extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // user => fantasy_scoring 1:many
      Fantasy_Scoring.belongsTo(Users, { foreignKey: 'user_id' })
    }
  }
  Fantasy_Scoring.init({
    user_id: {
      allowNull: false,
      type: DataTypes.INT
    },
    year: {
      allowNull: false,
      type: DataTypes.INT,
    },
    holes_completed: {
      allowNull: false,
      type: DataTypes.INT,
      defaultValue: 0
    },
    round1: {
      allowNull: false,
      type: DataTypes.INT,
      defaultValue: 0
    },
    round2: {
      allowNull: false,
      type: DataTypes.INT,
      defaultValue: 0
    },
    round3: {
      allowNull: false,
      type: DataTypes.INT,
      defaultValue: 0
    },
    round4: {
      allowNull: false,
      type: DataTypes.INT,
      defaultValue: 0
    },
    round1_sf: {
      allowNull: false,
      type: DataTypes.INT,
      defaultValue: 0
    },
    round2_sf: {
      allowNull: false,
      type: DataTypes.INT,
      defaultValue: 0
    },
    round3_sf: {
      allowNull: false,
      type: DataTypes.INT,
      defaultValue: 0
    },
    round4_sf: {
      allowNull: false,
      type: DataTypes.INT,
      defaultValue: 0
    },
    round1_aggr: {
      allowNull: false,
      type: DataTypes.INT,
      defaultValue: 0
    },
    round2_aggr: {
      allowNull: false,
      type: DataTypes.INT,
      defaultValue: 0
    },
    round3_aggr: {
      allowNull: false,
      type: DataTypes.INT,
      defaultValue: 0
    },
    round4_aggr: {
      allowNull: false,
      type: DataTypes.INT,
      defaultValue: 0
    },
    holes_display: {
      allowNull: false,
      type: DataTypes.CHAR,
      defaultValue: '0'
    },
    display_round: {
      allowNull: false,
      type: DataTypes.INT,
      defaultValue: 1
    },
    seq_num: {
      allowNull: true,
      type: DataTypes. HAR,
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
    modelName: 'Fantasy_Scoring',
  });
  return Fantasy_Scoring;
};