const express = require("express");
const port = 8000;
const db = require("./config/mongoose");
const expressLayouts = require("express-ejs-layouts");

//using passport local strategy
const session = require("express-session");
const passport = require("passport");
const passportLocal = require("./config/passport-local-strategy");
const cookieParser = require("cookie-parser");

//using notyjs for notification
const flash = require("connect-flash");
const customMware = require("./config/middleware");

//using express
const app = express();

//setup layouts
app.use(expressLayouts);

app.use(express.urlencoded());
//setup for static files
app.use(express.static("./assets"));

app.use(cookieParser());

//for extract more styles
app.set("layout extractStyles", true);
app.set("layout extractScripts", true);

//view engine ejs setup
app.set("view engine", "ejs");
app.set("views", "./views");

//creating the session
app.use(
  session({
    secret: "blahsomething",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 100,
    },
  })
);

//initializing passport
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

//for notyjs notification
app.use(flash());
app.use(customMware.setFlash);

//initializing the router
app.use("/", require("./routes"));

//setting up the server on port 8000
app.listen(port, function (err) {
  if (err) {
    console.log(`Error in running the server: ${err}`);
  }
  console.log(`Server is running on port: ${port}`);
});
