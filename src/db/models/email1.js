const { Sequelize, DataTypes } = require('sequelize')
const sequelize = new Sequelize(require('../config/config')['development'])


const Email = sequelize.define('emails', {
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: Sequelize.literal('NOW()'),
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: Sequelize.literal('NOW()'),
  },
  receivers: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: false,
  },
  sender: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  subject: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  text: {
    type: DataTypes.STRING,
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
