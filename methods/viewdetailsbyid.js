// const products = require("../DB/product");
const getProducts = require("../utils/getproducts");
const viewdetails = (req, res) => {
  if (!req.session.isLoggedIn) {
    res.redirect("/login");
    return;
  }
  var id = req.params.id;
  if (!id) {
    res.send("Error in fetching products");
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

    const idx = products.findIndex(function (e) {
      return e.id == id;
    });
    if (idx == -1) {
      res.send("Error in fetching products");
    }
    //console.log(idx);

    res.render("viewdeatils", {
      data: products[idx],
      productid: id,
      isLoggedIn: req.session.isLoggedIn,
      username: req.session.username,
    });
  });
};

module.exports = viewdetails;
