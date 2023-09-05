//initializing models
const User = require("../models/user");
const AssignedReview = require("../models/assignedReview");
const MyReview = require("../models/myReviews");

//for rendering the employee list page
module.exports.home = async function (req, res) {
  try {
    let users = await User.find({});
    res.render("employeeSection", {
      title: "Employee List",
      users: users,
    });
  } catch (error) {
    console.log("Error", error);
    return;
  }
};

//for updating the employee information:omly admin can see and update
module.exports.update = async function (req, res) {
  try {
    let user = await User.findById(req.params.id);

    if (
      user.name == req.body.name &&
      user.email == req.body.email &&
      user.password == req.body.password
    ) {
      req.flash("success", "No Values Updated");
      return res.redirect("back");
    }

    user.name = req.body.name;
    user.email = req.body.email;
    user.password = req.body.password;

    user.save();
    req.flash("success", "User Updated succesfully");
    return res.redirect("back");
  } catch (error) {
    console.log("Error", error);
    return res.redirect("back");
  }
};
//for deleting the employee information:omly admin can see and delete
module.exports.delete = async function (req, res) {
  try {
    let user = await User.findById(req.params.id);
    user.deleteOne();
    await AssignedReview.deleteMany({ fromUser: req.params.id });
    let MyRiviewIDS = await MyReview.find({ fromUser: req.params.id });

    for (let review of MyRiviewIDS) {
      let userid = review.toUser;
      await User.findByIdAndUpdate(userid, { $pull: { myReviews: review.id } });
      await review.deleteOne();
    }
    res.redirect("back");
  } catch (error) {
    console.log("Error", error);
    return;
  }
};

//to make a employee as admin by changing the permission value to admin in db
module.exports.makeadmin = async function (req, res) {
  try {
    let user = await User.findById(req.params.id);
    //changing the permission value to admin
    user.permission = "admin";

    user.save();
    req.flash("success", "User Promoted to Admin");
    return res.redirect("back");
  } catch (error) {
    console.log("Error", error);
    return res.redirect("back");
  }
};

//to remove admin permision by changing the permission value to employee
module.exports.removeadmin = async function (req, res) {
  try {
    let user = await User.findById(req.params.id);
    //changing permission value to employee
    user.permission = "employee";

    user.save();
    req.flash("success", "User removed as Admin");
    return res.redirect("back");
  } catch (error) {
    console.log("Error", error);
    return res.redirect("back");
  }
};
