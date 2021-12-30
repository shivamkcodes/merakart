const getProducts = require("../utils/getproducts");
const Products = require("../models/product");

const addproducts = (req, res) => {
  //console.log(req.body);

  const {
    productName,

    productDescription,
    productPrice,
    productQuantity,
    productImageUrl,
  } = req.body;
  if (
    !productName ||
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

    //  console.log(productsintxt);

    const obj = {
      name: productName,
      quantity: productQuantity,
      price: productPrice,
      image: productImageUrl,
      desc: productDescription,
    };

    //  console.log(req.body, obj);

    const product = new Products(obj);
    product.save((err, prod) => {
      // if (err) {
      //   return res.sendStatus(400).json({
      //     err,
      //   });
      if (err) {
        res.render("signup", {
          error: "Error in fetching DB",
          isLoggedIn: req.session.isLoggedIn,
          username: req.session.username,
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

    // writefile("./DB/product.txt", JSON.stringify(productsintxt), (err) => {
    //   if (err) {
    //     res.render("signup", {
    //       error: "Error in fetching DB",
    //       isLoggedIn: req.session.isLoggedIn,
    //     });
    //     return;
    //   } else {
    //     res.render("congratulation.ejs", {
    //       msg: "product added successfully",
    //       isLoggedIn: req.session.isLoggedIn,
    //       username: req.session.username,
    //     });
    //   }
    // });
  });
};

module.exports = addproducts;
