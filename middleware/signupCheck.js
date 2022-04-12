const user = require('../database/model/user');

async function signupCheck(req, res, next) {
  const { name, age, mobile, password, rePassword } = req.body;
  if (
    !name?.trim() ||
    !age ||
    !mobile?.trim() ||
    !password ||
    !rePassword
  ) {
    return res.json('enter all inputs');
  }

  if (age > 80) {
    return res.json('age can not be greather than 80');
  }
  if (password.length < 8) {
    return res.json('password must be greather than 8 character');
  }
  if (password !== rePassword) {
    return res.json('password is not match');
  }
  if (await user.findOne({ name: name.trim() })) {
    return res.json('name is not acceptable');
  }
  if (await user.findOne({ mobile: mobile.trim() })) {
    return res.json('mobile is not acceptable');
  }

  next();
}

module.exports = signupCheck;
