const express = require('express');
const router = express.Router();
const { signinProcess } = require('../controller/signin');
const signinCheck = require('../middleware/signinCheck');


router.post('/', signinCheck, signinProcess);

// router.route("/").get(signin).post(signinProcess)
module.exports = router;
