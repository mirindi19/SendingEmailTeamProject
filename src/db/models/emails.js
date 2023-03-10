'use strict';
const { Model } = require('sequelize');
const { Sequelize, DataTypes } = require('sequelize')
const sequelize = new Sequelize(require('../config/config')['development'])


  class emails extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  emails.init({
    sender: DataTypes.STRING,
    receivers: DataTypes.ARRAY(DataTypes.STRING),
    subject: DataTypes.STRING,
    text: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'emails',
  });
  //return emails;
  //console.log(emails); // true


  module.exports = emails;