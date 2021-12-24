const readfile = require("../utils/readfile");
const getProducts = require("../utils/getproducts");

const getCart = (req, res) => {
  if (req.session.isLoggedIn) {
    readfile("./DB/auth.txt", (err, data) => {
      if (err) {
        res.render("login", {
          error: "Error in fetching DB",
          isLoggedIn: req.session.isLoggedIn,
          test: "login",
        });
        // return;
      } else {
        data = JSON.parse(data);
        var testobj;
        const idx = data.findIndex(function (e) {
          val = e.username;
          testobj = e.cart;
          return e.username === req.session.username;
        });
        //req.session.username = val;
        req.session.cart = data[idx].cart;
        var object = data[idx].cart;
      }

      var data = [];
      var unique = [];
      for (const property in object) {
        unique.push(property);
        //console.log(`${property}: ${object[property]}`);
      }

      getProducts(function (err, products) {
        if (err) {
          res.render("login", {
            error: "products not found",
            isLoggedIn: req.session.isLoggedIn,
            username: req.session.username,
          });
          return;
        }

        // console.log(typeof products);

        products.forEach((e) => {
          unique.forEach((el) => {
            if (e.id == el) {
              data.push(e);
            }
          });
        });
        //console.log(data[0].cart[1]);

        //console.log(data);
        res.render("cart.ejs", {
          isLoggedIn: req.session.isLoggedIn,
          username: req.session.username,
          token: req.session.token,
          products: data,
          cart: testobj,
        });
      });
    });
  } else {
    res.redirect("/login");
  }
};

module.exports = getCart;
