const client = require('../database/model/user');
const bcrypt = require('bcryptjs');

async function resetPasswordCheck(req, res, next) {
  try {
    if (
      !req.body.oldpassword ||
      !req.body.newpassword ||
      !req.body.confirmpassword
    ) {
      return res.status(403).json('enter all inputs');
    }
    const user = await client.findOne({ name: req.session.user.name });
    const compared = await bcrypt.compare(req.body.oldpassword, user.password);
    if (!compared) {
      return res.status(400).json('worng password');
    }
    if (
      !req.body.newpassword.match(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/
      )
    ) {
      return res.status(400).json('password must be complex');
    }
    if (req.body.newpassword !== req.body.confirmpassword) {
      return res.status(400).json('confirm password not match');
    }
   
  } catch (error) {
    return res.status(400).json('worng password');
  }

  next();
}

module.exports = { resetPasswordCheck };
