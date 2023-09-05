//setting up express router
const express = require("express");
const router = express.Router();
//intializing passport
const passport = require("passport");
//intializing employee controller
const employeeSection = require("../controllers/employee_controller");

//using passport.restrictAccessPages for restricting the admin access
router.get("/home", passport.restrictAccessPages, employeeSection.home);
router.post(
  "/update/:id",
  passport.checkAuthentication,
  employeeSection.update
);
router.get("/delete/:id", employeeSection.delete);
router.get("/makeadmin/:id", employeeSection.makeadmin);
router.get("/removeadmin/:id", employeeSection.removeadmin);

module.exports = router;
