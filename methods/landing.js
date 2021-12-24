// const products = require("../DB/product.js");
const getProducts = require("../utils/getproducts");

const landing = (req, res) => {
  //console.log(req.session.token);

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

    var { pageNo } = req.query;
    var arr = [];
    const prodPerPage = 5;
    const total = Math.ceil(products.length / prodPerPage);

    if (!pageNo) {
      pageNo = 1;
      arr = products.slice(0, prodPerPage * pageNo);
    } else {
      pageNo = parseInt(pageNo);

      arr = products.slice(0, prodPerPage * pageNo);
    }

    res.render("index", {
      isLoggedIn: req.session.isLoggedIn,
      test: "login",
      username: req.session.username,
      token: req.session.token,
      products: arr,
      pageNo: parseInt(pageNo + 1),
      maxpage: total,
    });
  });
};

module.exports = landing;
