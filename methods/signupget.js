const signupget = (req, res) => {
  if (req.session.isLoggedIn) {
    res.redirect("/");
  } else {
    res.render("signup", {
      error: "",
      isLoggedIn: req.session.isLoggedIn,
      test: "login",
    });
  }
};

module.exports = signupget;
