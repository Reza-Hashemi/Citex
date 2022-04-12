const express = require('express');
const router = express.Router();
const { signupProcess } = require('../controller/signup');
const signupCheck = require('../middleware/signupCheck');

router.post('/', signupCheck, signupProcess);

module.exports = router;
