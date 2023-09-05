//setting up express router
const express = require("express");
const router = express.Router();
//intializing passport
const passport = require("passport");
//initializing review controller
const assignWork = require("../controllers/review_controller");

//ristricting the employee access using passport.restrictAccessPages
router.get("/assignWork", passport.restrictAccessPages, assignWork.home);
router.post("/createReview", assignWork.createReview);

module.exports = router;
