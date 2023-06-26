const express = require("express");
const services = require("../services/render");
const controller = require("../controller/controller");
const router = express.Router();
const bcrypt = require("bcryptjs");
const passport = require("passport");
// Load User model
const User = require("../model/User");

const {
  ensureAuthenticated,
  forwardAuthenticated,
} = require("../../config/auth.js");
// Login Page
router.get("/login", forwardAuthenticated, (req, res) => res.render("login"));

// Register Page
router.get("/register", forwardAuthenticated, (req, res) =>
  res.render("register")
);

// Register
router.post("/register", (req, res) => {
  const { name, email, password, password2 } = req.body;
  let errors = [];

  if (!name || !email || !password || !password2) {
    errors.push({ msg: "Please enter all fields" });
  }

  if (password != password2) {
    errors.push({ msg: "Passwords do not match" });
  }

  if (password.length < 6) {
    errors.push({ msg: "Password must be at least 6 characters" });
  }

  if (errors.length > 0) {
    res.render("register", {
      errors,
      name,
      email,
      password,
      password2,
    });
  } else {
    User.findOne({ email: email }).then((user) => {
      if (user) {
        errors.push({ msg: "Email already exists" });
        res.render("register", {
          errors,
          name,
          email,
          password,
          password2,
        });
      } else {
        const newUser = new User({
          name,
          email,
          password,
        });

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then((user) => {
                req.flash(
                  "success_msg",
                  "You are now registered and can log in"
                );
                res.redirect("/login");
              })
              .catch((err) => console.log(err));
          });
        });
      }
    });
  }
});

/**
 *  @description Root Route
 *  @method GET /
 */
router.get("/admin", services.homeRoutes);
/**
 *  @description add users
 *  @method GET /add-user
 */
router.get("/add-product", services.add_product);

/**
 *  @description for update user
 *  @method GET /update-user
 */
router.get("/update-product", services.update_product);

router.get("/", services.homePage);

router.get("/cart", services.cart);
// API
router.post("/api/products", controller.create);
router.get("/api/products", controller.find);
router.put("/api/products/:id", controller.update);
router.delete("/api/products/:id", controller.delete);

router.get("/api/cart", controller.findorder);
router.post("/api/cart", controller.neworder);
router.delete("/api/cart/:id", controller.itemsdelete);
module.exports = router;
