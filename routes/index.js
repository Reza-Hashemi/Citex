var express = require('express');
var router = express.Router();
const signup = require('./signup');
const signout = require('./signout');
const dashboard = require('./dashboard');
const signin = require('./signin');
const { sessionDashboard } = require('../middleware/sessionDashboard');
const {sessionSignin} = require('../middleware/sessionSignin');

router.use('/signup', sessionDashboard, signup);
router.use('/signin', sessionDashboard, signin);
router.use('/dashboard', sessionSignin, dashboard);
router.use('/signout', signout);
module.exports = router;
