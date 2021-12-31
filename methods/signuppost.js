const sendEmail = require("../utils/sendEmail");
const passwordVali = require("../utils/passwordValidator");
const FakeUser = require("../models/fakeuser");
const User = require("../models/user");

const signuppost = (req, res) => {
  // console.log(req.body);

  const { email, username, password, mobile, confirmPassword } = req.body;
  //  console.log(email);

  if (!email || !username || !password || !mobile || !confirmPassword) {
    res.render("signup", {
      error: "plz fill all fields",
      isLoggedIn: req.session.isLoggedIn,
    });
    return;
  }

  if (password !== confirmPassword) {
    res.render("signup", {
      error: "your password doesnot match with confirm password",
      isLoggedIn: req.session.isLoggedIn,
    });
    return;
  }

  var Ispass = passwordVali(password);
  if (!Ispass) {
    res.render("signup", {
      error: "plz set a strong💪 password",
      isLoggedIn: req.session.isLoggedIn,
    });
    return;
  }

  User.find(
    {
      $or: [
        {
          email,
        },
        {
          username,
        },
      ],
    },
    (err, data) => {
      if (err) {
        console.log("err Db");

        res.render("signup", {
          error: "username already taken",
          isLoggedIn: req.session.isLoggedIn,
        });
        return;
      } else if (data.length == 0) {
        const user = new FakeUser(req.body);
        sendEmail(email, user.token, function (err, data) {
          console.log("email data", data, err);
        });
        user.save((err, user) => {
          if (err) {
            res.render("signup", {
              error: err,
              isLoggedIn: req.session.isLoggedIn,
            });
            return;
          } else {
            console.log(email);
            res.render("middle.ejs");
          }
        });
      } else {
        console.log("else part", data.length);

        res.render("signup", {
          error: "username already taken",
          isLoggedIn: req.session.isLoggedIn,
        });
        return;
      }
    }
  );

  // res.json(user);
  // res.json({
  //   username: user.username,
  //   email: user.email,
  //   mobile: user.mobile,
  //   id: user._id,
  // });

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

  //     const idx = arr.findIndex(function (e) {
  //       return e.email === req.body.email;
  //     });
  //     const idx2 = arr.findIndex(function (e) {
  //       return e.username === username;
  //     });

  //     console.log(idx2);
  //     if (idx !== -1) {
  //       res.render("signup", {
  //         error: "user already registered!!! plz login",
  //         isLoggedIn: req.session.isLoggedIn,
  //       });
  //       return;
  //     }
  //     if (idx2 !== -1) {
  //       res.render("signup", {
  //         error: "username already taken!!! plz use another",
  //         isLoggedIn: req.session.isLoggedIn,
  //       });
  //       return;
  //     } else {
  //       let token = Date.now();

  //       let roleval;
  //       if (role) {
  //         roleval = 1;
  //       } else {
  //         roleval = 0;
  //       }

  //       arr.push({
  //         email,
  //         username,
  //         password,
  //         mobile,
  //         isVerified: false,
  //         token: token,
  //         cart: {},
  //         role: roleval,
  //       });

  //       arr.token = token;

  //       writefile("./DB/auth.txt", JSON.stringify(arr), (err) => {
  //         if (err) {
  //           res.render("signup", {
  //             error: "Error in fetching DB",
  //             isLoggedIn: req.session.isLoggedIn,
  //           });
  //           return;
  //         } else {
  //           console.log(email);
  //           sendEmail(email, token, function (err, data) {
  //             console.log("email data", data, err);
  //           });
  //           res.redirect("/login");
  //         }
  //       });
  //     }
  //   }
  // });
};

module.exports = signuppost;
