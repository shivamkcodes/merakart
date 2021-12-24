const loginget = (req, res) => {
  if (req.session.isLoggedIn) {
    res.redirect("/");
  } else {
    res.render("login", {
      error: "",
      isLoggedIn: req.session.isLoggedIn,
      test: "login",
      raw: "signup",
      username: req.session.username,
    });
  }
};

module.exports = loginget;
