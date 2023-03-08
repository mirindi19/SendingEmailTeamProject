const sendgrid = require('@sendgrid/mail');
const Email = require('../db/models/emails');
//const Email = require('../db/models/emails').emails
const { Sequelize, DataTypes } = require('sequelize')
const sequelize = new Sequelize(require('../db/config/config')['development'])

console.log(Email);
sendgrid.setApiKey(process.env.SENDGRID_API_KEY);

async function sendEmail(req, res) {
  const { subject, message, receivers } = req.body;
  const msg = {
    to: receivers,
    from: 'ishimwe96@gmail.com',
    subject,
    text: message
  };
  try {
    await sendgrid.send(msg);
    
    const email = await Email.create({
      sender : 'ishimwe96@gmail.com',
      subject,
      text: message,
      receivers:[receivers],
      sentAt: new Date()
    });
    res.status(201).json(email);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error saving email' });
  }
}

module.exports = {
  sendEmail
};
