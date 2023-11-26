const express = require("express");
const cors = require("cors");
const router = require("./routes");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const ApiResponse = require("./middleware/ApiResponse");
const passport = require("passport");
const passportConfig = require("./auth/passportConfig");
require("dotenv").config();

const app = express();

const PORT = process.env.PORT || 8000;
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, function () {
      console.log(`server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    confirm.log("db error => ", err.message);
  });

const store = new MongoDBStore({
  uri: process.env.MONGO_URI,
  collection: "mySessions",
});

store.on("error", function (error) {
  console.log(error);
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(ApiResponse);

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
      httpOnly: false,
    },
    store: store,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(
  cors({
    origin: ["http://localhost:8000"],
    credentials: true,
    allowedHeaders: "*",
  })
);

app.use(passport.initialize());
app.use(passport.session());
passportConfig(passport);
app.use("/api", router);
