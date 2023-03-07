const sendgrid = require('@sendgrid/mail');
const Email = require('../models/email');

sendgrid.setApiKey(process.env.SENDGRID_API_KEY);

async function sendEmail(req, res) {
  const { subject, message, recipients } = req.body;
  const msg = {
    to: recipients,
    from: 'ishimwe96@gmail.com',
    subject,
    text: message
  };

  try {
    await sendgrid.send(msg);
    const email = await Email.create({
      subject,
      message,
      recipients:[recipients],
      sentAt: new Date()
    });
    res.status(201).json(email);
  } catch (err) {
    console.error(err);
    res.status(200).json({ message: 'Email is sent' });
  }
}

module.exports = {
  sendEmail
};
