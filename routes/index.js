//setup express and router
const express = require("express");
const router = express.Router();
const homeController = require("../controllers/home_controller");

//router to render the home page
router.get("/", homeController.home);

//usig middleware

//exporting the router
module.exports = router;
