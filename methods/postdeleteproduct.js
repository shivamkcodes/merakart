const getProducts = require("../utils/getproducts");
const writefile = require("../utils/writefile");

const deleteproduct = (req, res) => {
  const productId = req.body.productid;
  //console.log(productId);

  if (!productId) {
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

    const idx = products.findIndex(function (e) {
      return e.id == productId;
    });
    //console.log(idx);

    products.splice(idx, 1);

    writefile("./DB/product.txt", JSON.stringify(products), (err) => {
      if (err) {
        res.render("signup", {
          error: "Error in fetching DB",
          isLoggedIn: req.session.isLoggedIn,
        });
        return;
      } else {
        res.render("congratulation", {
          msg: "product deleted Sucessfully",
          isLoggedIn: req.session.isLoggedIn,
          username: req.session.username,
        });
      }
    });
  });
};

module.exports = deleteproduct;
