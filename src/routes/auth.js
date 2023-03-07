const express = require('express');
const passport = require('../config/passport');
const authController = require('../controllers/authController');

const router = express.Router();

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

//router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/' }), User.findOrCreate());
router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/' }), authController.googleCallback);
//User.findOrCreate()
module.exports = router;
