const adminModel = require("../models/adminModel");
const bcrypt = require("bcryptjs");

async function getAllUsers(req, res) {
  if (req.query.limit < 1 | req.query.page < 1) {
    return res.status(400).json("Invalid pagination parameters entered.");
  }
  const skip = req.query.page && req.query.limit ? ((Number(req.query.page) - 1) * Number(req.query.limit)) : ((Number(req.query.page) - 1) * 5);
  const query = {
    take: (Number(req.query.limit) || 10),
    skip: (skip || undefined),
  }
  const users = await adminModel.getAllUsers(query);
  res.json(users);
}

async function updateUser(req, res) {
  if (req.body.role && req.body.role !== "USER" | req.body.role && req.body.role !== "ADMIN") {
    return res.status(400).json("Invalid role type entered. Please enter USER or ADMIN.");
  }
  // if password was entered as input field, check length then create hashedPassword
  if (req.body.password) {
    if (req.body.password.length < 5) {
      return res.status(403).json("Password must be at least 5 characters long.")
    }
    var hashedPassword = await bcrypt.hash(req.body.password, 10);
  }
  const query = {
    userId: req.body.userId,
    username: req.params.username,
    newUsername: req.body.username,
    password: hashedPassword,
    email: req.body.email,
    role: req.body.role
  }
  const user = await adminModel.updateUser(query);
  // database query will return null if specified user does not exist
  if (!user) {
    return res.status(404).json("Specified user does not exist.");
  }
  if (user === "taken") {
    return res.status(409).json("That username already exists. Please choose another.");
  }
  res.json(user);
}

async function getUserByUsername(req, res) {
  const query = {
    username: req.params.username,
  }
  const user = await adminModel.getUserByUsername(query);
  // database query will return null if specified user does not exist
  if (!user) {
    return res.status(404).json("Specified user does not exist.");
  }
  res.json(user);
}

async function deleteUser(req, res) {
  const query = {
    userId: req.params.userId
  }
  // database query will return null if specified user does not exist
  const user = await adminModel.deleteUser(query);
  if (user === null) {
    return res.status(404).json("Resource not found.");
  }
  res.status(204).json();
}

async function getPostsByUsername(req, res) {
  if (req.query.limit < 1 | req.query.page < 1) {
    return res.status(400).json("Invalid pagination parameters entered.");
  }
  const skip = req.query.page && req.query.limit ? ((Number(req.query.page) - 1) * Number(req.query.limit)) : ((Number(req.query.page) - 1) * 5);
  if (req.query.sort) {
    var sort = {};
    switch (req.query.sort) {
      case "date":
        sort["publishedAt"] = (req.query.order === "desc" ? "desc" : "asc");
        break;
      case "title":
        sort["title"] = (req.query.order === "desc" ? "desc" : "asc");
        break;
      case "rating":
        sort["totalRating"] = (req.query.order === "desc" ? "desc" : "asc");
        break;
      case "comments":
        sort["comments"] = { "_count": (req.query.order === "desc" ? "desc" : "asc") };
        break;
    }
  }
  const query = {
    username: req.params.username,
    take: (Number(req.query.limit) || 10),
    skip: (skip || undefined),
    sort: ((sort || { "publishedAt": "desc" }))
  }
  const posts = await adminModel.getPostsByUsername(query);
  // database query will return null if specified user does not exist
  if (!posts) {
    return res.status(404).json("Specified user does not exist.");
  }
  res.json(posts);
}

async function getCommentsByUsername(req, res) {
  if (req.query.limit < 1 | req.query.page < 1) {
    return res.status(400).json("Invalid pagination parameters entered.");
  }
  const skip = req.query.page && req.query.limit ? ((Number(req.query.page) - 1) * Number(req.query.limit)) : ((Number(req.query.page) - 1) * 5);
  if (req.query.sort) {
    var sort = {};
    switch (req.query.sort) {
      case "date":
        sort["postedAt"] = (req.query.order === "desc" ? "desc" : "asc");
        break;
      case "rating":
        sort["totalRating"] = (req.query.order === "desc" ? "desc" : "asc");
        break;
    }
  }
  const query = {
    username: req.params.username,
    take: (Number(req.query.limit) || 10),
    skip: (skip || undefined),
    sort: (sort || { "postedAt": "desc" })
  }
  const comments = await adminModel.getCommentsByUsername(query);
  // database query will return null if specified user does not exist
  if (!comments) {
    return res.status(404).json("Specified user does not exist.");
  }
  res.json(comments);
}

async function getDraftsByUsername(req, res) {
  if (req.query.limit < 1 | req.query.page < 1) {
    return res.status(400).json("Invalid pagination parameters entered.");
  }
  const skip = req.query.page && req.query.limit ? ((Number(req.query.page) - 1) * Number(req.query.limit)) : ((Number(req.query.page) - 1) * 5);
  if (req.query.sort) {
    var sort = {};
    switch (req.query.sort) {
      case "edited":
        sort["lastEditedAt"] = (req.query.order === "desc" ? "desc" : "asc");
        break;
      case "created":
        sort["createdAt"] = (req.query.order === "desc" ? "desc" : "asc");
        break;
    }
  }
  const query = {
    username: req.params.username,
    take: (Number(req.query.limit) || 10),
    skip: (skip || undefined),
    sort: ((sort || { "lastEditedAt": "desc" }))
  }
  const drafts = await adminModel.getDraftsByUsername(query);
  // database query will return null if specified user does not exist
  if (!drafts) {
    return res.status(404).json("Specified user does not exist.");
  }
  res.json(drafts);
}

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
      case "username":
        sort["author.username"] = (req.query.order || "asc");
      case "published":
        sort["published"] = (req.query.order || "asc");
    }
  }
  if (req.query.limit < 1 | req.query.page < 1) {
    return res.status(400).json("Invalid pagination parameters entered.");
  }
  const skip = req.query.page && req.query.limit ? ((Number(req.query.page) - 1) * Number(req.query.limit)) : ((Number(req.query.page) - 1) * 5);
  const query = {
    take: (Number(req.query.limit) || 10),
    skip: (skip || undefined),
    sort: (sort || { "publishedAt": "desc" }),
  }
  const posts = await adminModel.getAllPosts(query);
  res.json(posts);
}

async function getPostByPostId(req, res) {
  const query = {
    postId: req.params.postId,
  }
  const post = await adminModel.getPostByPostId(query);
  res.json(post);
}

async function deletePost(req, res) {
  const query = {
    postId: req.params.postId,
  }
  const post = await adminModel.deletePost(query);
  // database query will return null if specified post does not exist
  if (!post) {
    return res.status(404).json("Resource not found.");
  }
  res.status(204).json();
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
    sort: (sort || { "postedAt": "desc" })
  }
  const comments = await adminModel.getCommentsByPostId(query);
  // database query will return null if specified post does not exist
  if (!comments) {
    return res.status(404).json("Resource not found.");
  }
  res.json(comments);
}

async function getCommentByCommentId(req, res) {
  const query = {
    commentId: req.params.commentId,
  }
  const comment = await adminModel.getCommentByCommentId(query);
  // database query will return null if specified comment does not exist
  if (!comment) {
    return res.status(404).json("Resource not found.");
  }
  res.json(comment);
}

async function deleteComment(req, res) {
  const query = {
    commentId: req.params.commentId,
  }
  const comment = await adminModel.deleteComment(query);
  // database query will return null if specified comment does not exist
  if (!comment) {
    return res.status(404).json("Resource not found.");
  }
  res.status(204).json();
}

module.exports = {
  getAllUsers,
  getUserByUsername,
  updateUser,
  deleteUser,
  getPostsByUsername,
  getCommentsByUsername,
  getDraftsByUsername,
  getAllPosts,
  getPostByPostId,
  deletePost,
  getCommentsByPostId,
  getCommentByCommentId,
  deleteComment,
}