
const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const passport = require("passport");
const { redirectUrlMiddleware } = require("../middleware.js");

const UserController = require("../controllers/users.js");

router
    .route("/signup")
    .get(UserController.renderSignUpPage)
    .post(UserController.signUp);

router
    .route("/signin")
    .get(UserController.renderSignInPage)
    .post(redirectUrlMiddleware, 
        passport.authenticate("local", {failureRedirect: "/signin", failureFlash: true}),
        UserController.signIn
    );

router.get("/signout", UserController.signOut);

module.exports = router;