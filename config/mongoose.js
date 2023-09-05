const mongoose = require("mongoose");

main().catch((err) => console.log(err));

//connecting to mongodb
async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/Employee_Review_System");
}

//to check the mongodb connection
const db = mongoose.connection;
db.once("open", function () {
  console.log("Successfully connected to database");
});
//exportig the db
module.exports = db;
