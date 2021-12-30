const getProducts = require("../utils/getproducts");
const writefile = require("../utils/writefile");

const updateproduct = (req, res) => {
  const productid = req.body.productid;

  if (!productid) {
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
      return e.id == productid;
    });
    console.log("this is", idx);

    // console.log(products[idx]);
    const id = products[idx].id;
    const name = products[idx].name;
    const price = products[idx].price;
    const quantity = products[idx].quantity;
    const img = products[idx].image;
    const desc = products[idx].desc;

    res.render("updateproduct.ejs", {
      isLoggedIn: req.session.isLoggedIn,
      username: req.session.username,
      id,
      name,
      price,
      quantity,
      img,
      desc,
    });
  });
};

module.exports = updateproduct;
