'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class LogChannel extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  LogChannel.init({
    guild: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    channel: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'LogChannel',
  });
  return LogChannel;
};