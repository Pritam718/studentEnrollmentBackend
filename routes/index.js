const express = require("express");
const post_route = require("./postRoute");
const auth_route = require("./authRoute");
const router = express();

router.use("/student", post_route);
router.use("/auth", auth_route);

module.exports = router;
