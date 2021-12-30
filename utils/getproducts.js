const Products = require("../models/product");

// this function will return array of users
module.exports = function (callback) {
  Products.find({}, (err, products) => {
    if (err || !products) {
      //error handling
      callback("products not found");
      return;
    } else {
      callback(null, products);
    }
  });
  // readFile("./DB/product.txt", function (err, data) {
  //   if (err) {
  //     //error handling
  //     callback("users not found");
  //     return;
  //   }

  //   if (data.length > 0) {
  //     products = JSON.parse(data);
  //   }

  //   callback(null, products);
  // });
};
