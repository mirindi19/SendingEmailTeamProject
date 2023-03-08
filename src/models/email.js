const { Sequelize, DataTypes } = require('sequelize')
const sequelize = new Sequelize(require('../config/database')['development'])


const Email = sequelize.define('emails', {
  to: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: false,
  },
  from: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  subject: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  body: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  sent: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
});

Email.init(Email.prototype.attributes, {
  sequelize,
  modelName: 'emails',
});

module.exports = Email;
