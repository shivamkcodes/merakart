const readFile = require("./readfile");

// this function will return array of users
module.exports = function (callback) {
  readFile("./DB/product.txt", function (err, data) {
    if (err) {
      //error handling
      callback("users not found");
      return;
    }
    //console.log(data);

    // let products = [];

    if (data.length > 0) {
      products = JSON.parse(data);
    }

    callback(null, products);
  });
};
