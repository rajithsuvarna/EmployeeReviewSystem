//setting up express router
const express = require("express");
const router = express.Router();
//intializing passport
const passport = require("passport");
//initializing user controller
const userProfile = require("../controllers/user_controller");

//restricting the admin acces using passport.restrictAccess
router.get("/Signin", passport.restrictAccess, userProfile.Signin);
router.get("/Signup", passport.restrictAccess, userProfile.SignUp);
router.post("/create", userProfile.create);

//Use passport as a middleware to Authenticate
router.post(
  "/create-session",
  passport.authenticate("local", { failureRedirect: "/users/Signin" }),
  userProfile.createSession
);

router.get("/Signout", userProfile.destroySession);

module.exports = router;
