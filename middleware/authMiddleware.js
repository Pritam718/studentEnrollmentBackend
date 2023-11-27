const authMiddleware = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.apiResponse(false, "You are not authorized");
  }
};

module.exports = authMiddleware;
