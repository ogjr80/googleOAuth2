const express = require("express");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const passport = require("passport");
const app = express();

const keys = require("./config/keys");
require("./models/User");
require("./services/passport");

mongoose.Promise = global.Promise;
mongoose.connect(keys.mongoURI, function() {
  console.log("Database Connection established successfully");
});

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKeys]
  })
);
app.use(passport.initialize());
app.use(passport.session());

//routes
require("./routes/authRoutes")(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT, function() {
  console.log("Recruits Api now running on port 5000");
});
