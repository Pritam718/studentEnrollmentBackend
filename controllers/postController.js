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
    
      res.apiResponse(true, "Data Submit Successfully", postData);
  } catch (error) {
    res.apiResponse(false, error.message);
  }
};

const getPost = async (req, res) => {
  try {
    const posts = await Post.find();
    res.apiResponse(true, "posts successfully fetched", posts);
  } catch (error) {
    res.apiResponse(false, error.message);
  }
};
const deletePost = async (req, res) => {
  try {
    const id = req.params.id;
    await Post.deleteOne({ _id: id });
    res.apiResponse(true, "Post delete successfully");
  } catch (error) {
    res.apiResponse(false, error.message);
  }
};
const updatePost = async (req, res) => {
  try {
    const id = req.params.id;
    const payload = req.body;
    await Post.findByIdAndUpdate(id, {...payload,firstName:payload?.fname,lastName:payload?.lname});
    res.apiResponse(true, "Post updated" );
  } catch (error) {
    res.apiResponse(false, error.message);
  }
};
module.exports = {
  createPost,
  getPost,
  deletePost,
  updatePost,
};
