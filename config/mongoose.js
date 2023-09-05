const mongoose = require("mongoose");

main().catch((err) => console.log(err));

//connecting to mongodb
async function main() {
  await mongoose.connect("mongodb+srv://rajithsuvarna49:kmVf31e7ExfbE4vS@cluster0.xffsluf.mongodb.net/reviewsystem?retryWrites=true&w=majority");
}

//to check the mongodb connection
const db = mongoose.connection;
db.once("open", function () {
  console.log("Successfully connected to database");
});
//exportig the db
module.exports = db;
