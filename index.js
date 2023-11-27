const express = require("express");
const cors = require("cors");
const router = require("./routes");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const ApiResponse = require("./middleware/ApiResponse");
const passport = require("passport");
const passportConfig = require("./auth/passportConfig");
const http = require("http");
const { Server } = require("socket.io");
require("dotenv").config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

global.io = io;

io.on("connection", (socket) => {
  console.log("A user connected", socket.id);

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

const PORT = process.env.PORT || 8000;
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    server.listen(PORT, function () {
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

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Origin", req.headers.origin);
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept"
  );
  if ("OPTIONS" == req.method) {
    res.sendStatus(200);
  } else {
    next();
  }
});

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
      httpOnly: false,
      // sameSite: "none",
      // secure: true,
    },
    store: store,
    resave: false,
    saveUninitialized: false,
  })
);

// app.use(
//   cors({
//     origin: [
//       "http://localhost:3000",
//       "https://student-enrolment-frontend.onrender.com",
//     ],
//     credentials: true,
//     methods: "GET,POST,PUT,DELETE",
//   })
// );

app.use(passport.initialize());
app.use(passport.session());
passportConfig(passport);
app.use("/api", router);
