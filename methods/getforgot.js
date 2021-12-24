const readfile = require("../utils/readfile");

const getforgot = (req, res) => {
  // console.log("hit");

  const token = req.params.token;

  readfile("./DB/auth.txt", (err, data) => {
    if (err) {
      res.render("login", {
        error: "Error in fetching DB",
        isLoggedIn: req.session.isLoggedIn,
        test: "login",
      });
      return;
    } else {
      data = JSON.parse(data);
      var val;
      const idx = data.findIndex(function (e) {
        val = e.username;
        return e.token == token;
      });
      if (idx != -1) {
        //console.log("292", val);
        req.session.username = val;

        res.render("changepassword", {
          isLoggedIn: req.session.isLoggedIn,
          username: req.session.username,
          error: "",
        });
      } else {
        res.send("Error");
      }
    }
  });
};

module.exports = getforgot;
