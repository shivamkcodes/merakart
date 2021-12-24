const getProducts = require("../utils/getproducts");

const getadmin = (req, res) => {
  getProducts(function (err, products) {
    if (err) {
      res.render("login", {
        error: "products not found",
        isLoggedIn: req.session.isLoggedIn,
        username: req.session.username,
      });
      return;
    }

    res.render("admin", {
      isLoggedIn: req.session.isLoggedIn,
      username: req.session.username,
      products: products,
    });
  });
};

module.exports = getadmin;
