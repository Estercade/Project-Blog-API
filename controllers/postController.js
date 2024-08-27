const postModel = require("../models/postModel");
const jwt = require("jsonwebtoken");

async function getAllPosts(req, res) {
  const order = {};
  switch (req.query.sort) {
    case "date":
      order["publishedAt"] = req.query.order;
      break;
    case "name":
      order["title"] = req.query.order;
      break;
    case "rating":
      order["averageRating"] = req.query.order;
      break;
  }
  const posts = await postModel.getAllPosts(order);
  res.json(posts);
}

async function getPostByPostId(req, res) {
  const postId = req.params.postId;
  let currentUserId = undefined;
  if (req.headers.authorization) {
    currentUserId = jwt.decode((req.headers.authorization.split(' ')[1]), { complete: true }).payload.userId;
  }
  const post = await postModel.getPostByPostId(postId, currentUserId);
  // database query will return null if author id does not match current user's id
  if (!post) {
    return res.status(403).json("You do not have access to this file.");
  }
  res.json(post);
}

async function getPostsByUserId(req, res) {
  const posts = await postModel.getPostsByUserId(req.userId);
  res.json(posts);
}

async function createPost(req, res) {
  const token = (req.headers.authorization.split(' ')[1])
  const currentUserId = jwt.decode(token, { complete: true }).payload.userId;
  const query = {
    title: req.body.title,
    content: req.body.content,
    authorId: currentUserId,
    published: undefined,
    publishedAt: undefined
  }
  if (req.body.published === "true" | req.body.published === true) {
    query.published = true;
    query.publishedAt = new Date();
  }
  const post = await postModel.createPost(query);
  res.json(post);
}

async function updatePost(req, res) {
  const query = {
    title: req.body.title,
    content: req.body.content,
    published: undefined,
    publishedDate: undefined
  }
  if (req.body.published === "true" | req.body.published === true) {
    query.published = true;
  }
  const post = await postModel.updatePost(req.params.postId, query);
  res.json(post);
}

async function deletePost(req, res) {
  await postModel.deletePost(req.params.postId);
  res.json("Post deleted");
}

async function publishPost(req, res) {
  const post = await postModel.publishPost(req.params.postId);
  res.json(post);
}

async function ratePost(req, res) {
  const rating = Number(req.body.rating);
  const post = await postModel.ratePost(req.params.postId, rating);
  res.json(post);
}

async function getCommentsByPostId(req, res) {
  const comments = await postModel.getCommentsByPostId(req.params.postId);
  res.json(comments);
}

async function createComment(req, res) {
  const comment = await postModel.createComment(req.params.postId, req.body);
  res.json(comment);
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