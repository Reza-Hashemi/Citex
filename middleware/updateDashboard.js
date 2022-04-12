const client = require('../database/model/user');

async function updateDashboard(req, res, next) {
  const user = req.session.user;

  const { name, age, mobile } = req.body;
  if (!name?.trim() || !mobile?.trim() || !age) {
    return res.json('Filled All Inputs');
  }
  if (name.length < 3) {
    return res.json('username is not accepted');
  }

  if ((await client.findOne({ name: name })) && req.session.user.name !== name) {
    return res.json('username is not accepted');
  }
  if (
    (await client.findOne({ mobile: mobile })) &&
    req.session.user.mobile !== mobile
  ) {
    return res.json('mobile is not accepted');
  }

  next();
}

module.exports = updateDashboard;
