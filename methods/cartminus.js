const readfile = require("../utils/readfile");
const writefile = require("../utils/writefile");

const cartminus = (req, res) => {
  //console.log(req.body);
  readfile("./DB/auth.txt", (err, data) => {
    if (err) {
      res.render("login", {
        error: "Error in fetching DB",
        isLoggedIn: req.session.isLoggedIn,
        test: "login",
      });
      // return;
    } else {
      data = JSON.parse(data);

      const idx = data.findIndex(function (e) {
        return e.username === req.body.username;
      });
      if (data[idx].cart[req.body.productid] >= 1) {
        data[idx].cart[req.body.productid] -= 1;
      }
      //console.log(data[idx].cart[req.body.productid]);
    }

    writefile("./DB/auth.txt", JSON.stringify(data), (err) => {
      if (err) {
        res.render("signup", {
          error: "Error in fetching DB",
          isLoggedIn: req.session.isLoggedIn,
        });
        return;
      } else {
        res.redirect("/cart");
      }
    });
  });

  //res.end();
};

module.exports = cartminus;
