const getProducts = require("../utils/getproducts");

const Products = require("../models/product");

const deleteproduct = (req, res) => {
  const productname = req.body.productid;
  console.log(productname);

  if (!productname) {
    res.render("login", {
      error: "plz add product Id",
      isLoggedIn: req.session.isLoggedIn,
      username: req.session.username,
    });
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

    Products.deleteOne({ name: productname }, (err, product) => {
      if (err) {
        res.send(err);
      } else {
        res.send(product);
      }
    });

    // const idx = products.findIndex(function (e) {
    //   return e.id == productId;
    // });
    //console.log(idx);

    //products.splice(idx, 1);

    // writefile("./DB/product.txt", JSON.stringify(products), (err) => {
    //   if (err) {
    //     res.render("signup", {
    //       error: "Error in fetching DB",
    //       isLoggedIn: req.session.isLoggedIn,
    //     });
    //     return;
    //   } else {
    //     res.render("congratulation", {
    //       msg: "product deleted Sucessfully",
    //       isLoggedIn: req.session.isLoggedIn,
    //       username: req.session.username,
    //     });
    //   }
    // });
  });
};

module.exports = deleteproduct;
