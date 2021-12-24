module.exports = function (req, res, next) {
  if (req.session.isLoggedIn) {
    if (req.session.role == 1) {
      next();
    } else {
      res.render("unauthorized", {
        isLoggedIn: req.session.isLoggedIn,
        username: req.session.username,
      });
    }
  } else {
    res.redirect("/login");
  }
};
