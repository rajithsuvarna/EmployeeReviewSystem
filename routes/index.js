//setting up express router
const express = require("express");
const router = express.Router();
//intializing home controller
const homeController = require("../controllers/home_controller");
//intializing passport
const passport = require("passport");

router.get("/", passport.checkAuthentication, homeController.home);
router.post(
  "/completeReview",
  passport.checkAuthentication,
  homeController.completeReview
);

//using middleware to accsss other route elements
router.use("/users", require("./users"));
router.use("/review", require("./review"));
router.use("/employee", require("./employeeSection"));

module.exports = router;
