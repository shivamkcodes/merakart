const Users = require("../models/user");

const postaddtocart = (req, res) => {
  //userid means unique username
  const { userid, productid } = req.body;
  //console.log(userid, productid);
  if (userid == "") {
    res.redirect("/login");
  } else {
    // checking if the same productid available in cart
    Users.findOne({ username: userid }, (err, userData) => {
      if (err) {
        res.render("login", {
          error: "Error in fetching DB",
          isLoggedIn: req.session.isLoggedIn,
          test: "login",
        });
        return;
      } else {
        var dbcart = userData.cart;
        // console.log(dbcart);
        const idx = dbcart.findIndex(function (e) {
          return e.productid === productid;
        });
        // console.log(idx);
        if (idx == -1) {
          var newCartArray = [{ productid, count: 1 }];

          Users.updateOne(
            { username: userid },
            { $push: { cart: newCartArray } },
            (err, updatedCart) => {
              if (err) {
                console.log(err);

                res.render("login", {
                  error: "Error in fetching DB",
                  isLoggedIn: req.session.isLoggedIn,
                  test: "login",
                  username: req.session.username,
                });
                return;
              } else {
                // res.send(updatedCart);
                res.redirect("/cart");
              }
            }
          );
        } else {
          res.redirect("/cart");
        }
      }
    });

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
    //       //tomail = e.email;
    //       return e.username === userid;
    //     });
    //     if (idx != -1) {
    //       data[idx].cart[productid] = 1;
    //       writefile("./DB/auth.txt", JSON.stringify(data), (err) => {
    //         if (err) {
    //           res.render("signup", {
    //             error: "Error in fetching DB",
    //             isLoggedIn: req.session.isLoggedIn,
    //           });
    //           return;
    //         } else {
    //           res.redirect("/cart");
    //         }
    //       });
    //     } else {
    //       res.send("Error hu m");
    //       return;
    //     }
    //   }
    // });
  }
};

module.exports = postaddtocart;
