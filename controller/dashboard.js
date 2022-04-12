const client = require('../database/model/user');
const bcrypt = require('bcryptjs');

async function dashboardRender(req, res) {
    console.log("hello");
  const user = req.session.user;
  res.status(200).json(user);
}

async function dashboardUpdate(req, res) {
  try {
    const updated = await client.findByIdAndUpdate(
      req.session.user._id,
      req.body,
      {
        new: true,
      }
    );
    req.session.user = updated;
    return res.status(200).redirect('/dashboard');
  } catch (error) {
    res.status(400).json('somthing Wrong');
  }
}

async function dashboardRemove(req, res) {
  try {
    const deleteReq = await client.findById(req.params.id)
    if(req.session.user._id !== deleteReq._id.toString()){
      return res.json("access denied")
    }
    await client.findByIdAndDelete(req.params.id);
    return res.json("user deleted")
  } catch (error) {
    return res.status(500).json('somthing wrong');
  }
}


async function resetPasswordProcess(req, res) {
  try {
    const hash = await bcrypt.hash(req.body.newpassword, 10);
    await client.findByIdAndUpdate(req.session.user._id, {
      password: hash,
    });
    return res.status(200).redirect('/dashboard');
  } catch (error) {
    return res.status(500).json('somthing worng');
  }
}

module.exports = {
  dashboardRender,
  dashboardUpdate,
  dashboardRemove,
  resetPasswordProcess,
};
