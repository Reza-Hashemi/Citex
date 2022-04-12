const client = require('../database/model/user');
const bcrypt = require('bcryptjs');

async function signinCheck(req, res, next) {
    console.log(req.body);
  try {
    const { password, mobile } = req.body;

    if (!mobile || !password) {
      return res.status(400).json('enter mobile and password');
    }
    const user = await client.findOne({ mobile: req.body.mobile });
    if (!user) {
      return res.status(403).json('mobile or password is wrong');
    }

    const result = await bcrypt.compare(password, user.password);
    if (!result) {
      return res.status(403).json('name or password is wrong');
    }
    req.session.user = user;
  } catch (error) {
    return res.status(500).json(error.message);
  }

  next();
}

module.exports = signinCheck;
