module.exports.home = async function (req, res) {
  try {
    return res.render("home", { title: "Home Page" });
  } catch (err) {
    console.log("Error:".err);
    return;
  }
};
