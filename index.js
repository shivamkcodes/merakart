const express = require("express");
const session = require("express-session");
const cors = require("cors");
const app = express();
require("dotenv").config();
const port = 1900;

// utilFunction
const readfile = require("./utils/readfile");
const writefile = require("./utils/writefile");
const sendEmail = require("./utils/sendEmail");
const sendEmailForgot = require("./utils/sendEmailForgot");
const passwordVali = require("./utils/passwordValidator");
const sendMailCongo = require("./utils/sendEmailCongratulaions");
const getProducts = require("./utils/getproducts");
const checkauth = require("./middlewares/checkauth");
const adminvalidation = require("./middlewares/adminvalidation");
const landing = require("./methods/landing");
const signupget = require("./methods/signupget");
const signuppost = require("./methods/signuppost");
const loginget = require("./methods/loginget");
const loginpost = require("./methods/loginpost");
const logout = require("./methods/logout");
const viewdetails = require("./methods/viewdetailsbyid");
const verifyuser = require("./methods/verifyUserUsingToken");
const getchangepassword = require("./methods/getChangePassword");
const postchangepassword = require("./methods/postChangePassword");
const postforgotsubmit = require("./methods/postforgotsubmit");
const getforgot = require("./methods/getforgot");
const postaddtocart = require("./methods/postaddtocart");
const getcart = require("./methods/getcart");
const cartplus = require("./methods/cartplus");
const cartminus = require("./methods/cartminus");
const getadmin = require("./methods/getadmin");
const addproducts = require("./methods/addproducts");
const postdeleteproduct = require("./methods/postdeleteproduct");
const updateproduct = require("./methods/updateproduct");
const updateandsave = require("./methods/updateandsave");

// middlewares
app.use(cors());
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
app.use(
  session({
    secret: process.env.secret,
    resave: false,
    saveUninitialized: true,
  })
);

// routes
app.get("/", checkauth, landing);

app.route("/signup").get(signupget).post(signuppost);

app.route("/login").get(loginget).post(loginpost);

app.get("/logout", logout);

app.get("/viewdetails/:id", viewdetails);

app.get("/verifyuser/:token", verifyuser);

app
  .route("/changepassword/:id")
  .get(getchangepassword)
  .post(postchangepassword);

app.get("/forgot", (req, res) => {
  res.render("forgot.ejs", {
    isLoggedIn: req.session.isLoggedIn,
    username: req.session.username,
    error: "",
  });
});

app.post("/forgotsubmit", postforgotsubmit);

app.get("/forgot/:token", getforgot);

app.post("/", postaddtocart);

app.get("/cart", getcart);

app.post("/cartplus", cartplus);

app.post("/cartminus", cartminus);

app.get("/admin", adminvalidation, getadmin);

app.post("/addproduct", adminvalidation, addproducts);

app.post("/deleteproduct", adminvalidation, postdeleteproduct);

app.post("/updateproduct", adminvalidation, updateproduct);

app.post("/updateandsave", adminvalidation, updateandsave);

app.listen(port, () => {
  console.log("app is up and runnig at ", port);
});
