const User = require("../models/userModel");

const login = (req, res) => {
  try {
    res.apiResponse(true, "user logged in successfully", req.user);
  } catch (err) {
    res.apiResponse(false, err.message);
  }
};

const register = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!!user)
      return res.apiResponse(true, "user alrady exist with this email");
    const newUser = await User.create({ email: email, password: password });
    res.apiResponse(true, "user registered successfully", newUser);
  } catch (err) {
    res.apiResponse(false, err.message);
  }
};

const getAuthUser = async (req, res) => {
  try {
    const id = req.user.id;
    const user = await User.findById(id);
    res.apiResponse(true, "user found", user);
  } catch (err) {
    res.apiResponse(false, err.message);
  }
};

const logout = (req, res) => {
  req.session.destroy();
  res.clearCookie("connect.sid");
  res.send();
};

module.exports = { login, register, getAuthUser, logout };
