const getProducts = require("../utils/getproducts");
const writefile = require("../utils/writefile");

const updateandsave = (req, res) => {
  //console.log(req.body);

  const {
    productId,
    productName,
    productDescription,
    productPrice,
    productQuantity,
    productImageUrl,
  } = req.body;

  if (
    !productId ||
    !productName ||
    !productDescription ||
    !productPrice ||
    !productQuantity ||
    !productImageUrl
  ) {
    res.send("Plz add all the fields..");
    return;
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

    products[idx].name = productName;
    products[idx].quantity = productQuantity;
    products[idx].price = productPrice;
    products[idx].image = productImageUrl;
    products[idx].desc = productDescription;

    writefile("./DB/product.txt", JSON.stringify(products), (err) => {
      if (err) {
        res.render("signup", {
          error: "Error in fetching DB",
          isLoggedIn: req.session.isLoggedIn,
        });
        return;
      } else {
        res.render("congratulation", {
          msg: "product updated Sucessfully",
          isLoggedIn: req.session.isLoggedIn,
          username: req.session.username,
        });
      }
    });
  });
};

module.exports = updateandsave;
