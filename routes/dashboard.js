const express = require('express');
const router = express.Router();
const updateDashboard = require('../middleware/updateDashboard');
const { resetPasswordCheck } = require('../middleware/resetPasswordCheck');
const {
  dashboardRender,
  dashboardUpdate,
  dashboardRemove,
  resetPasswordProcess,
} = require('../controller/dashboard');


router.get('/', dashboardRender);
router.put('/', updateDashboard, dashboardUpdate);
router.delete('/:id', dashboardRemove);
router.put('/resetpassword', resetPasswordCheck, resetPasswordProcess);

module.exports = router;