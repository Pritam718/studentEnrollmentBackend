const express = require("express");
const auth_route = express();

const authController = require("../controllers/authController");
const passport = require("passport");
const authMiddleware = require("../middleware/authMiddleware");

auth_route.post(
  "/login",
  passport.authenticate("login-username-password"),
  authController.login
);

auth_route.post("/register", authController.register);

auth_route.get("/getuser", authMiddleware, authController.getAuthUser);

auth_route.post("/logout", authController.logout);

module.exports = auth_route;
