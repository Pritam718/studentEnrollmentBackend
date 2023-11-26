const authMiddleware = (req, res, next) => {
  console.log(req.isAuthenticated());
  if (req.isAuthenticated()) {
    next();
  } else {
    res.apiResponse(false, "You are not authorized");
  }
};

module.exports = authMiddleware;
