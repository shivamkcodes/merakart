const readfile = require("../utils/readfile");
const sendEmailForgot = require("../utils/sendEmailForgot");
const User = require("../models/user");

const postforgotsubmit = (req, res) => {
  const email = req.body.email;
  console.log(email);

  if (!email) {
    res.render("forgot", {
      isLoggedIn: req.session.isLoggedIn,
      username: req.session.username,
      error: "fill all fields",
    });
    return;
  }
  User.findOne(
    {
      email: email,
    },
    (err, data) => {
      if (err || !data) {
        res.render("forgot", {
          isLoggedIn: req.session.isLoggedIn,
          username: req.session.username,
          error: "Email not found ",
        });
        return;
      } else {
        //   // console.log(email, tok);
        var tok = data.token;
        sendEmailForgot(email, tok, function (err, data) {
          console.log("email data", data, err);
        });
        res.render("forgotEmail.ejs", {
          isLoggedIn: req.session.isLoggedIn,
          username: req.session.username,
        });
      }
    }
  );

  // readfile("./DB/auth.txt", (err, data) => {
  //   if (err) {
  //     res.render("signup", {
  //       error: "Error in fetching DB",
  //       isLoggedIn: req.session.isLoggedIn,
  //     });
  //     return;
  //   } else {
  //     arr = [];
  //     if (data.length > 0) {
  //       arr = JSON.parse(data);
  //     }
  //     // console.log(arr);
  //     var tok;
  //     const idx = arr.findIndex(function (e) {
  //       tok = e.token;
  //       return e.email === req.body.email;
  //     });

  //     if (idx === -1) {
  //       res.render("forgot", {
  //         isLoggedIn: req.session.isLoggedIn,
  //         username: req.session.username,
  //         error: "Email not found ",
  //       });
  //       return;
  //     } else {
  //       // console.log(email, tok);

  //       sendEmailForgot(email, tok, function (err, data) {
  //         console.log("email data", data, err);
  //       });
  //       res.render("forgotEmail.ejs", {
  //         isLoggedIn: req.session.isLoggedIn,
  //         username: req.session.username,
  //       });
  //     }
  //   }
  // });
};

module.exports = postforgotsubmit;
