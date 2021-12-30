const sendMailCongo = require("../utils/sendEmailCongratulaions");
const passwordVali = require("../utils/passwordValidator");
const User = require("../models/user");

const postchangepassword = (req, res) => {
  const id = req.params.id;
  const { newpassword, confirmpassword } = req.body;
  if (!newpassword || !confirmpassword) {
    res.render("changepassword", {
      error: "please fill all the fields",
      isLoggedIn: req.session.isLoggedIn,
      username: req.session.username,
    });
    return;
  }
  if (newpassword !== confirmpassword) {
    res.render("changepassword", {
      error: "both passwords doesnot matches",
      isLoggedIn: req.session.isLoggedIn,
      username: req.session.username,
    });
    return;
  }
  const val = passwordVali(newpassword);
  //console.log(val);
  if (!val) {
    res.render("changepassword", {
      error: "plz set a strong password",
      isLoggedIn: req.session.isLoggedIn,
      username: req.session.username,
    });
    return;
  }
  var tomail;

  User.findOneAndUpdate(
    {
      username: id,
    },
    {
      $set: {
        password: newpassword,
        confirmPassword: confirmpassword,
      },
    },
    {
      new: true,
    },
    (err, purchase) => {
      if (err) {
        res.render("signup", {
          error: "Error in fetching DB",
          isLoggedIn: req.session.isLoggedIn,
        });
        return;
      } else {
        tomail = purchase.email;
        sendMailCongo(tomail, function (err, data) {
          console.log("email data", data, err);
        });
        // req.session.destroy((err) => {
        //   if (err) {
        //     res.send(err);
        //   } else {
        //     res.redirect("/");
        //   }
        // });
        req.session.isLoggedIn = false;
        // console.log(purchase);
        res.render("successpage", {
          isLoggedIn: req.session.isLoggedIn,
          username: req.session.username,
        });
      }
    }
  );

  // readfile("./DB/auth.txt", (err, data) => {
  //   if (err) {
  //     res.render("login", {
  //       error: "Error in fetching DB",
  //       isLoggedIn: req.session.isLoggedIn,
  //       test: "login",
  //     });
  //     return;
  //   } else {
  //     data = JSON.parse(data);
  //     const idx = data.findIndex(function (e) {
  //       tomail = e.email;
  //       return e.username === id;
  //     });
  //     if (idx != -1) {
  //       // console.log("292", data[idx]);
  //       data[idx].password = newpassword;
  //       // console.log(tomail);

  //       writefile("./DB/auth.txt", JSON.stringify(data), (err) => {
  //         if (err) {
  //           res.render("signup", {
  //             error: "Error in fetching DB",
  //             isLoggedIn: req.session.isLoggedIn,
  //           });
  //           return;
  //         } else {
  //           sendMailCongo(tomail, function (err, data) {
  //             console.log("email data", data, err);
  //           });
  //           res.render("successpage", {
  //             isLoggedIn: req.session.isLoggedIn,
  //             username: req.session.username,
  //           });
  //         }
  //       });
  //     } else {
  //       res.send("Error");
  //       return;
  //     }
  //   }
  // });
};

module.exports = postchangepassword;
