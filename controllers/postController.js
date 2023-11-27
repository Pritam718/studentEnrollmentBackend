//const postModel = require("../models/postModel");
const Post = require("../models/postModel");
const { ObjectId } = require("mongoose").Types;
const createPost = async (req, res) => {
  try {
    const post = new Post({
      firstName: req?.body?.fname,
      lastName: req?.body?.lname,
      phone: req?.body?.phone,
      email: req?.body?.email,
      gender: req?.body?.gender,
      website: req?.body?.website,
      java: req?.body?.java,
      css: req?.body?.css,
      html: req?.body?.html,
    });
    const postData = await post.save();
    const io = global.io;
    io.emit("newRecord", postData);
    res
      .status(200)
      .send({ success: true, msg: "Data Submit Successfully", data: postData });
  } catch (error) {
    res.status(400).send({ success: false, msg: error.message });
  }
};

const getPost = async (req, res) => {
  try {
    const posts = await Post.find();
    res.apiResponse(true, "posts successfully fetched", posts);
  } catch (error) {
    res.status(400).send({ success: false, msg: error.message });
  }
};
const deletePost = async (req, res) => {
  try {
    const id = req.params.id;
    await Post.deleteOne({ _id: id });
    res.status(200).send({ success: true, msg: "Post delete successfully" });
  } catch (error) {
    res.status(400).send({ success: false, msg: error.message });
  }
};
const updatePost = async (req, res) => {
  console.log(req.body);
  try {
    const id = req.params.id;
    const payload = req.body;
    await Post.findByIdAndUpdate(id, payload);
    res.status(200).send({ success: true, msg: "Post updated" });
  } catch (error) {
    res.status(400).send({ success: false, msg: error.message });
  }
};
module.exports = {
  createPost,
  getPost,
  deletePost,
  updatePost,
};
