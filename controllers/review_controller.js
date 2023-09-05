//initializing models
const User = require("../models/user");
const AssignedReview = require("../models/assignedReview");
const MyReview = require("../models/myReviews");

//to render assignwork page
module.exports.home = async function (req, res) {
  try {
    let users = await User.find({});
    res.render("assignwork", {
      title: "Assignwork Page",
      users: users,
    });
  } catch (error) {
    console.log("Error", error);
    return;
  }
};

//to create review
module.exports.createReview = async function (req, res) {
  try {
    if (req.body.recipient == req.body.reviewer) {
      req.flash("success", "Recipient and Reviewer cannot be same");
      return res.redirect("back");
    }
    let review = await AssignedReview.findOne({
      fromUser: req.body.reviewer,
      toUser: req.body.recipient,
    });

    if (review) {
      req.flash(
        "success",
        "Review Already Assigned for same Recipient and Reviewer"
      );
      return res.redirect("back");
    }

    review = await AssignedReview.create({
      fromUser: req.body.reviewer,
      toUser: req.body.recipient,
    });

    let user = await User.findById(req.body.reviewer);

    user.assignedReviews.push(review);
    user.save();

    req.flash("success", "Review Assigned Successfully");
    return res.redirect("back");
  } catch (error) {
    console.log("Error", error);
  }
};
