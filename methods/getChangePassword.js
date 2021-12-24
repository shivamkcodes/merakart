const getchangepassword = (req, res) => {
  res.render("changepassword", {
    isLoggedIn: req.session.isLoggedIn,
    username: req.session.username,
    error: "",
  });
};

module.exports = getchangepassword;
