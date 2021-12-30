const User = require("../models/user");

const verifyuser = (req, res) => {
  var tk = req.params.token;
  console.log(tk);
  User.findOneAndUpdate(
    {
      token: tk,
    },
    {
      $set: {
        isVerified: true,
      },
    },
    {
      new: true,
    },
    (err, purchase) => {
      if (err) {
        res.render("signup", {
          error: err,
          isLoggedIn: req.session.isLoggedIn,
        });
        return;
      } else {
        req.session.isVerified = true;
        res.redirect("/");
      }
    }
  );
};

// readfile("./DB/auth.txt", (err, data) => {
//   if (err) {
//     res.render("login", {
//       error: "Error in fetching DB",
//       isLoggedIn: req.session.isLoggedIn,
//       test: "login",
//     });
//     return;
//   } else {
//     //console.log(data);

//     data = JSON.parse(data);
//     var val;
//     const idx = data.findIndex(function (e) {
//       val = e.password;
//       return e.token == tk;
//     });
//     if (idx != -1) {
//       console.log("292", data[idx]);
//       req.session.isVerified = true;
//       data[idx].isVerified = true;

//       writefile("./DB/auth.txt", JSON.stringify(data), (err) => {
//         if (err) {
//           res.render("signup", {
//             error: "Error in fetching DB",
//             isLoggedIn: req.session.isLoggedIn,
//           });
//           return;
//         } else {
//           res.redirect("/");
//         }
//       });
//     } else {
//       res.send("Error");
//     }
//   }
// });

module.exports = verifyuser;
