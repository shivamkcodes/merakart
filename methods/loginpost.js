const User = require("../models/user");

const loginpost = (req, res) => {
  //console.log(req.body);
  const { email, password } = req.body;

  if (!email || !password) {
    res.render("login", {
      error: "plz fill all fields",
      isLoggedIn: req.session.isLoggedIn,
      test: "login",
    });
    return;
  }

  User.findOne(
    {
      email,
    },
    (err, user) => {
      if (err || !user) {
        res.render("login", {
          error: "User Email doesnot exist",
          isLoggedIn: req.session.isLoggedIn,
          test: "login",
        });
        return;
      }

      const { username, role, confirmPassword, token, isVerified } = user;
      if (confirmPassword === password) {
        req.session.isLoggedIn = true;
        req.session.username = username;
        req.session.token = token;
        req.session.isVerified = isVerified;
        req.session.cart = user.cart;
        req.session.role = role;
        console.log("user logged in");

        res.redirect("/");
      } else {
        res.render("login", {
          error: "password doesnot matches with your email",
          isLoggedIn: req.session.isLoggedIn,
          test: "login",
        });
      }
      // else {
      //     //console.log(data);

      //     data = JSON.parse(data);
      //     var val;
      //     const idx = data.findIndex(function (e) {
      //       val = e.password;
      //       return e.email === req.body.email;
      //     });
      //     //console.log(idx);

      //     if (idx !== -1) {
      //       if (val === password) {
      //         req.session.isLoggedIn = true;
      //         //req.session.username = req.body.email;
      //         var val;
      //         readfile("./DB/auth.txt", (err, data) => {
      //           if (err) {
      //             res.render("login", {
      //               error: "Error in fetching DB",
      //               isLoggedIn: req.session.isLoggedIn,
      //               test: "login",
      //             });
      //             // return;
      //           } else {
      //             data = JSON.parse(data);

      //             const idx = data.findIndex(function (e) {
      //               val = e.username;
      //               return e.email === req.body.email;
      //             });
      //             //req.session.username = val;
      //           }
      //         });
      //         //console.log("line 173", data[idx]);
      //
      //       } else {
      //         res.render("login", {
      //           error: "password doesnot matches with your email",
      //           isLoggedIn: req.session.isLoggedIn,
      //           test: "login",
      //         });
      //       }
      //     } else {
      //       res.render("login", {
      //         error: "Email not registered,plz signUp",
      //         isLoggedIn: req.session.isLoggedIn,
      //         test: "login",
      //       });
      //     }
      //   }
      // });

      // return res.json({
      //   user: {
      //     _id,
      //     username,
      //     password,
      //     email,
      //     token,
      //     role,
      //     mobile,
      //     confirmPassword,
      //   },
      // });
    }
  );
};

// readfile("./DB/auth.txt", (err, data) => {
// if (err) {
//   res.render("login", {
//     error: "Error in fetching DB",
//     isLoggedIn: req.session.isLoggedIn,
//     test: "login",
//   });
// return;
//   } else {
//     //console.log(data);

//     data = JSON.parse(data);
//     var val;
//     const idx = data.findIndex(function (e) {
//       val = e.password;
//       return e.email === req.body.email;
//     });
//     //console.log(idx);

//     if (idx !== -1) {
//       if (val === password) {
//         req.session.isLoggedIn = true;
//         //req.session.username = req.body.email;
//         var val;
//         readfile("./DB/auth.txt", (err, data) => {
//           if (err) {
//             res.render("login", {
//               error: "Error in fetching DB",
//               isLoggedIn: req.session.isLoggedIn,
//               test: "login",
//             });
//             // return;
//           } else {
//             data = JSON.parse(data);

//             const idx = data.findIndex(function (e) {
//               val = e.username;
//               return e.email === req.body.email;
//             });
//             //req.session.username = val;
//           }
//         });
//         //console.log("line 173", data[idx]);
//         req.session.username = data[idx].username;
//         req.session.token = data[idx].token;
//         req.session.isVerified = data[idx].isVerified;
//         req.session.cart = data[idx].cart;
//         req.session.role = data[idx].role;

//         res.redirect("/");
//       } else {
//         res.render("login", {
//           error: "password doesnot matches with your email",
//           isLoggedIn: req.session.isLoggedIn,
//           test: "login",
//         });
//       }
//     } else {
//       res.render("login", {
//         error: "Email not registered,plz signUp",
//         isLoggedIn: req.session.isLoggedIn,
//         test: "login",
//       });
//     }
//   }
// });

module.exports = loginpost;
