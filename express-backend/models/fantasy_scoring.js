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
      type: DataTypes.INTEGER
    },
    year: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    holes_completed: {
      allowNull: false,
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    total: {
      allowNull: false,
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    round1: {
      allowNull: false,
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    round2: {
      allowNull: false,
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    round3: {
      allowNull: false,
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    round4: {
      allowNull: false,
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    total_no_bb: {
      allowNull: false,
      type: DataTypes.INTEGER,
      defaultValue: 9999
    },
    round1_no_bb: {
      allowNull: false,
      type: DataTypes.INTEGER,
      defaultValue: 9999
    },
    round2_no_bb: {
      allowNull: false,
      type: DataTypes.INTEGER,
      defaultValue: 999
    },
    round3_no_bb: {
      allowNull: false,
      type: DataTypes.INTEGER,
      defaultValue: 999
    },
    round4_no_bb: {
      allowNull: false,
      type: DataTypes.INTEGER,
      defaultValue: 999
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
    modelName: 'Fantasy_Scoring',
  });
  return Fantasy_Scoring;
};