const readfile = require("../utils/readfile");
const writefile = require("../utils/writefile");
const User = require("../models/user");
const cartminus = (req, res) => {
  //console.log(req.body);

  User.findOne({ username: req.body.username }, (err, userData) => {
    if (err) {
      res.render("login", {
        error: "Error in fetching DB",
        isLoggedIn: req.session.isLoggedIn,
        username: req.session.username,
        test: "login",
      });
      return;
    } else {
      var prodid = req.body.productid;
      // console.log(prodid);
      var dbcart = userData.cart;
      const idx = dbcart.findIndex(function (e) {
        return e.productid === prodid;
      });

      if (idx != -1) {
        if (dbcart[idx].count == 1) {
          // console.log("before", dbcart);
          // console.log(idx);

          dbcart.splice(idx, 1);
          //console.log("y dbcart", dbcart);
        } else if (dbcart[idx].count >= 2) {
          dbcart[idx].count -= 1;
        }
        User.updateOne(
          { username: req.body.username },
          { $set: { cart: dbcart } },
          (err, updatedData) => {
            if (err) {
              console.log(err);

              res.render("login", {
                error: "Error in fetching DB",
                isLoggedIn: req.session.isLoggedIn,
                username: req.session.username,
                test: "login",
              });
              return;
            } else {
              //console.log(updatedData);

              res.redirect("/cart");
            }
          }
        );
      } else {
        res.redirect("/cart");
      }

      // res.send(userData);
    }
  });

  // readfile("./DB/auth.txt", (err, data) => {
  //   if (err) {
  //     res.render("login", {
  //       error: "Error in fetching DB",
  //       isLoggedIn: req.session.isLoggedIn,
  //       test: "login",
  //     });
  //     // return;
  //   } else {
  //     data = JSON.parse(data);

  //     const idx = data.findIndex(function (e) {
  //       return e.username === req.body.username;
  //     });
  //     if (data[idx].cart[req.body.productid] >= 1) {
  //       data[idx].cart[req.body.productid] -= 1;
  //     }
  //     //console.log(data[idx].cart[req.body.productid]);
  //   }

  //   writefile("./DB/auth.txt", JSON.stringify(data), (err) => {
  //     if (err) {
  //       res.render("signup", {
  //         error: "Error in fetching DB",
  //         isLoggedIn: req.session.isLoggedIn,
  //       });
  //       return;
  //     } else {
  //       res.redirect("/cart");
  //     }
  //   });
  // });

  //res.end();
};

module.exports = cartminus;
