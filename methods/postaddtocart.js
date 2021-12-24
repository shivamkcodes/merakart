const readfile = require("../utils/readfile");
const writefile = require("../utils/writefile");

const postaddtocart = (req, res) => {
  // var un = req.params.username;
  const { userid, productid } = req.body;
  // console.log(userid, productid);
  if (userid == "") {
    res.redirect("/login");
  } else {
    readfile("./DB/auth.txt", (err, data) => {
      if (err) {
        res.render("login", {
          error: "Error in fetching DB",
          isLoggedIn: req.session.isLoggedIn,
          test: "login",
        });
        return;
      } else {
        data = JSON.parse(data);
        const idx = data.findIndex(function (e) {
          //tomail = e.email;
          return e.username === userid;
        });
        if (idx != -1) {
          data[idx].cart[productid] = 1;
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
        } else {
          res.send("Error");
          return;
        }
      }
    });
  }
};

module.exports = postaddtocart;
