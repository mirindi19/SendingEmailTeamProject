const express = require('express');
const passport = require('./config/passport');
const { Sequelize, DataTypes } = require('sequelize')
const sequelize = new Sequelize(require('./config/database')['development'])
const authRoutes = require('./routes/auth');
const emailRoutes = require('./routes/emails');

require('dotenv').config()

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());

// Routes
app.use('/auth', authRoutes);
app.use('/emails', emailRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong' });
});

// Start the server
const PORT = process.env.PORT || 3000;
sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
