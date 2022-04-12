async function signout(req, res) {
    req.session.destroy();
    res.json("sign out")
  }
  
  module.exports = { signout };
  