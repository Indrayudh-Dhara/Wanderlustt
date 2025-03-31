const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const {saveRedirect} = require("../middleware.js");
const userControllers = require("../controllers/user.js");

router.route("/signup")
.get(userControllers.renderSignupForm)
.post(wrapAsync(userControllers.signup));

router.route("/login")
.get( userControllers.renderLoginForm)
.post(saveRedirect, passport.authenticate('local', { failureRedirect: '/login' , failureFlash: true}),wrapAsync(userControllers.login));

router.get("/logout", userControllers.logout )

module.exports = router ;