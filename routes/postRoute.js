const express = require("express");
const post_route = express();

const postController = require("../controllers/postController");
const authMiddleware = require("../middleware/authMiddleware");

post_route.post("/", postController.createPost);

post_route.get("/", authMiddleware, postController.getPost);

post_route.delete("/:id", authMiddleware, postController.deletePost);

post_route.put("/:id", authMiddleware, postController.updatePost);

module.exports = post_route;
