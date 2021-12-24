const writefile = require("../utils/writefile");
const getProducts = require("../utils/getproducts");

const addproducts = (req, res) => {
  //console.log(req.body);

  const {
    productName,
    productId,
    productDescription,
    productPrice,
    productQuantity,
    productImageUrl,
  } = req.body;
  if (
    !productName ||
    !productId ||
    !productDescription ||
    !productPrice ||
    !productQuantity ||
    !productImageUrl
  ) {
    res.end("Plz add all the fields");
    return;
  }

  getProducts(function (err, productsintxt) {
    if (err) {
      res.render("login", {
        error: "products not found",
        isLoggedIn: req.session.isLoggedIn,
        username: req.session.username,
      });
      return;
    }

    console.log(typeof productsintxt);

    const obj = {
      id: productId,
      name: productName,
      quantity: productQuantity,
      price: productPrice,
      image: productImageUrl,
      desc: productDescription,
    };

    productsintxt.push(obj);

    writefile("./DB/product.txt", JSON.stringify(productsintxt), (err) => {
      if (err) {
        res.render("signup", {
          error: "Error in fetching DB",
          isLoggedIn: req.session.isLoggedIn,
        });
        return;
      } else {
        res.render("congratulation.ejs", {
          msg: "product added successfully",
          isLoggedIn: req.session.isLoggedIn,
          username: req.session.username,
        });
      }
    });
  });
};

module.exports = addproducts;
