const postModel = require("../models/postModel");
const jwt = require("jsonwebtoken");

async function getAllPosts(req, res) {
  if (req.query.sort) {
    var sort = {};
    switch (req.query.sort) {
      case "date":
        sort["publishedAt"] = (req.query.order || "asc");
        break;
      case "title":
        sort["title"] = (req.query.order || "asc");
        break;
      case "rating":
        sort["totalRating"] = (req.query.order || "asc");
        break;
      case "comments":
        sort["comments"] = { "_count": (req.query.order || "asc") };
        break;
    }
  }
  const query = {
    sort: (sort || { "publishedAt": "desc" })
  }
  const posts = await postModel.getAllPosts(query);
  res.json(posts);
}

async function getPostByPostId(req, res) {
  // retrieve current user's id
  if (req.headers.authorization) {
    currentUserId = jwt.decode((req.headers.authorization.split(" ")[1]), { complete: true }).payload.userId;
  }
  const query = {
    userId: req.headers.authorization ? currentUserId : undefined,
    postId: req.params.postId,
  }
  const post = await postModel.getPostByPostId(query);
  // database query will return invalid if author id does not match current user's id 
  // and post is unpublished (draft)
  if (post === "forbidden") {
    return res.status(403).json("You do not have access to this file.");
  }
  res.json(post);
}

async function createPost(req, res) {
  // if data is missing from request body, return HTTP error
  if (!req.body.title | !req.body.content) {
    return res.status(400).json("Required information in request body is missing.");
  }
  // retrieve current userId
  const currentUserId = jwt.decode((req.headers.authorization.split(" ")[1]), { complete: true }).payload.userId;
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
  // if data is missing from request body, return HTTP error
  if (!req.body.title | !req.body.content) {
    return res.status(400).json("Required information in request body is missing.");
  }
  // retrieve current userId
  const currentUserId = jwt.decode((req.headers.authorization.split(" ")[1]), { complete: true }).payload.userId;
  const query = {
    postId: req.params.postId,
    userId: currentUserId,
    title: req.body.title,
    content: req.body.content,
    published: undefined,
    publishedDate: undefined
  }
  if (req.body.published === "true" | req.body.published === true) {
    query.published = true;
  }
  const post = await postModel.updatePost(query);
  // database query will return "forbidden" if author id does not match current user"s id
  if (post === "forbidden") {
    return res.status(403).json("You do not have access to this file.");
  }
  res.json(post);
}

async function deletePost(req, res) {
  const currentUserId = jwt.decode((req.headers.authorization.split(' ')[1]), { complete: true }).payload.userId;
  const query = {
    userId: currentUserId,
    postId: req.params.postId
  }
  const post = await postModel.deletePost(query);
  // database query will return null if specified post does not exist
  if (!post) {
    return res.status(404).json("Resource not found.");
  }
  // database query will return forbidden if author id does not match current user's id
  if (post === "forbidden") {
    return res.status(403).json("You do not have access to this file.");
  }
  res.status(204).json();
}

async function ratePost(req, res) {
  // retrieve current user's id
  const currentUserId = jwt.decode((req.headers.authorization.split(' ')[1]), { complete: true }).payload.userId;
  // if data is missing from request body, return HTTP error
  if (!req.body.rating) {
    return res.status(400).json("Required information in request body is missing.");
  }
  if (req.body.rating > 1 | req.body.rating < -1) {
    return res.status(400).json("Invalid rating.")
  }
  const query = {
    userId: currentUserId,
    rating: Number(req.body.rating),
    postId: req.params.postId,
  }
  const rating = await postModel.ratePost(query);
  // database query will return null if specified post does not exist
  if (!rating) {
    return res.status(404).json("Resource not found.");
  }
  // update the post's rating if rating has been performed
  const post = await postModel.updatePostRating(query);
  res.json(post);
}

async function getCommentsByPostId(req, res) {
  if (req.query.limit < 1 | req.query.page < 1) {
    return res.status(400).json("Invalid pagination parameters entered.");
  }
  const skip = req.query.page && req.query.limit ? ((Number(req.query.page) - 1) * Number(req.query.limit)) : ((Number(req.query.page) - 1) * 5);
  if (req.query.sort) {
    var sort = {};
    switch (req.query.sort) {
      case "date":
        sort["postedAt"] = (req.query.order || "asc");
        break;
      case "rating":
        sort["totalRating"] = (req.query.order || "asc");
        break;
    }
  }
  const query = {
    postId: req.params.postId,
    take: (Number(req.query.limit) || 10),
    skip: (skip || undefined),
    sort: (sort || { "publishedAt": "desc" })
  }
  const comments = await postModel.getCommentsByPostId(query);
  // database query will return null if specified post does not exist
  if (!comments) {
    return res.status(404).json("Resource not found.");
  }
  res.json(comments);
}

async function createCommentByPostId(req, res) {
  // if data is missing from request body, return HTTP error
  if (!req.body.content) {
    return res.status(400).json("Required information in request body is missing.");
  }
  const currentUserId = jwt.decode((req.headers.authorization.split(" ")[1]), { complete: true }).payload.userId;
  const query = {
    content: req.body.content,
    authorId: currentUserId,
    postId: req.params.postId
  }
  const comment = await postModel.createCommentByPostId(query);
  // database query will return null if specified post does not exist
  if (!comment) {
    return res.status(404).json("Resource not found.");
  }
  res.json(comment);
}

module.exports = {
  getAllPosts,
  getPostByPostId,
  createPost,
  updatePost,
  deletePost,
  ratePost,
  getCommentsByPostId,
  createCommentByPostId
}