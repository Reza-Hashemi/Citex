async function sessionSignin(req, res, next) {
    if (!req.session.user || !req.cookies.user_sid) {
      return res.json("pleas signin");
    }
    next();
  }
  

  
  module.exports = {sessionSignin};