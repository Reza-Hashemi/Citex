const user = require('../database/model/user');


const signupProcess = (req, res) => {

  const NEW_USER = new user({
   
    name: req.body.name,
    password: req.body.password,
    age: req.body.age,
    mobile: req.body.mobile,

  });

  NEW_USER.save((error, user) => {
    if (error) {
      return res.json(error.message)
    }
    res.redirect('/dashboard');
  });
};

module.exports = { signupProcess };