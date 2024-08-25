const postModel = require("../models/postModel");

async function getAllPosts(req, res) {
  const posts = await postModel.getAllPosts();
  res.send(posts);
}

async function getPostByPostId(req, res) {
  const postId = req.params.postId;
  const post = await postModel.getPostByPostId(postId);
  res.send(post);
}

async function getPostsByUserId(req, res) {
  const queryUserId = req.userId;
  const posts = await postModel.getPostsByUserId(queryUserId);
  res.send(posts);
}

async function createPost(req, res) {
  const { title, content, authorId } = req.body;
  let published = publishedDate = undefined;
  if (req.body.published === "true" | req.body.published === true) {
    published = true;
    publishedDate = new Date();
  }
  const post = await postModel.createPost(title, content, authorId, published, publishedDate);
  res.send(post);
}

async function updatePost(req, res) {
  const postId = req.params.postId;
  const { title, content } = req.body;
  let published = undefined;
  if (req.body.published === "true" | req.body.published === true) {
    published = true;
  }
  const post = await postModel.updatePost(postId, title, content, published);
  res.send(post);
}

async function deletePost(req, res) {
  const postId = req.params.postId;
  await postModel.deletePost(postId);
  res.send("Post deleted");
}

async function publishPost(req, res) {
  const postId = req.params.postId;
  const post = await postModel.publishPost(postId);
  res.send(post);
}

async function ratePost(req, res) {
  const postId = req.params.postId;
  const rating = Number(req.body.rating);
  const post = await postModel.ratePost(postId, rating);
  res.send(post);
}

async function getCommentsByPostId(req, res) {
  const postId = req.params.postId;
  const comments = await postModel.getCommentsByPostId(postId);
  res.send(comments);
}

async function createComment(req, res) {
  const postId = req.params.postId;
  const { authorId, content } = req.body;
  const comment = await postModel.createComment(postId, content, authorId);
  res.send(comment);
}

module.exports = {
  getAllPosts,
  getPostByPostId,
  getPostsByUserId,
  createPost,
  updatePost,
  deletePost,
  publishPost,
  ratePost,
  getCommentsByPostId,
  createComment
}