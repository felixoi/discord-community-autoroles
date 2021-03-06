'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class AutoRole extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  AutoRole.init({
    guild: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    role: {
      type: DataTypes.STRING,
      primaryKey: true
    }
  }, {
    modelName: 'AutoRole',
    sequelize
  });
  return AutoRole;
};
