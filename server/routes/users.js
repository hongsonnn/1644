const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const passport = require("passport");
// Load User model
const User = require("../model/User");
const { forwardAuthenticated } = require("../../config/auth.js");

// Login Page
router.get("/login", forwardAuthenticated, (req, res) => res.render("login"));

// Login
router.post("/login", (req, res, next) => {
  passport.authenticate("local", {
    successRedirect: "/",
    users: req.user,
    failureRedirect: "/login",
    failureFlash: true,
  })(req, res, next);
  req.flash("loggedin", "confirm");
});

// Logout
router.get("/logout", (req, res) => {
  req.logout();
  req.flash("success_msg", "You are logged out");
  res.redirect("/login");
});

module.exports = router;
