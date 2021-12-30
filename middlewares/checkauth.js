module.exports = function (req, res, next) {
  if (req.session.isLoggedIn) {
    if (req.session.isVerified) {
      next();
    } else {
      res.render("notVerified", {
        isLoggedIn: req.session.isLoggedIn,
        username: req.session.username,
      });
    }
    // next();
  } else {
    res.redirect("/login");
  }
};
