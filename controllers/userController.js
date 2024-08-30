const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

async function createUser(req, res, next) {
  if (!req.body.username | !req.body.email | !req.body.password) {
    return res.status(400).json("Please complete required fields.");
  } else if (req.body.password.length < 5) {
    return res.status(403).json("Password must be at least 5 characters long.")
  }
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  const query = {
    username: req.body.username,
    email: req.body.email,
    password: hashedPassword
  }
  const user = await userModel.createUser(query);
  if (user === "taken") {
    return res.status(403).json("Username already exists.");
  }
  res.json(user);
}

async function getAllUsers(req, res) {
  if (req.query.sort) {
    var sort = {};
    switch (req.query.sort) {
      case "username":
        sort["username"] = (req.query.order === "desc" ? "desc" : "asc");
      case "posts":
        sort["posts"] = { "_count": (req.query.order === "desc" ? "desc" : "asc") };
        break;
      case "comments":
        sort["comments"] = { "_count": (req.query.order === "desc" ? "desc" : "asc") };
        break;
    }
  }
  const query = {
    sort: (sort || { "username": "asc" })
  }
  const users = await userModel.getAllUsers(query);
  res.json(users);
}

async function getUserByUsername(req, res) {
  const query = {
    username: req.params.username,
  }
  const user = await userModel.getUserByUsername(query);
  // database query will return null if specified user does not exist
  if (!user) {
    return res.status(404).json("Specified user does not exist.");
  }
  res.json(user);
}

async function updateUser(req, res, next) {
  if (!req.body.username | !req.body.email | !req.body.password) {
    return res.status(400).json("Please complete required fields.");
  }
  if (req.body.password.length < 5) {
    return res.status(403).json("Password must be at least 5 characters long.")
  }
  // retrieve current user's userId
  const currentUserId = jwt.decode((req.headers.authorization.split(" ")[1]), { complete: true }).payload.userId;
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  const query = {
    userId: currentUserId,
    username: req.body.username,
    email: req.body.email,
    password: hashedPassword
  }
  const user = await userModel.updateUser(query);
  // database query will return "taken" string if username is already taken by another user
  if (user === "taken") {
    return res.status(409).json("That username already exists. Please choose another.");
  }
  res.json(user);
}

async function deleteUser(req, res) {
  // retrieve current user's userId
  const currentUserId = jwt.decode((req.headers.authorization.split(" ")[1]), { complete: true }).payload.userId;
  // if target user's userId and current userId do not match, return HTTP error
  if (req.params.userId !== currentUserId) {
    return res.status(403).json("Forbidden");
  }
  await userModel.deleteUser(req.params.userId);
  res.status(204).json();
}

async function getPostsByUsername(req, res) {
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
        sort["rating"] = (req.query.order === "desc" ? "desc" : "asc");
        break;
      case "comments":
        sort["comments"] = { "_count": (req.query.order === "desc" ? "desc" : "asc") };
        break;
    }
  }
  const query = {
    username: req.params.username,
    sort: ((sort || { "publishedAt": "desc" }))
  }
  const posts = await userModel.getPostsByUsername(query);
  res.json(posts);
}

async function getCommentsByUsername(req, res) {
  if (req.query.sort) {
    var sort = {};
    if (req.query.sort === "date") {
      sort["posted"] = (req.query.order === "desc" ? "desc" : "asc");
    }
  }
  const query = {
    username: req.params.username,
    sort: (sort || { "posted": "desc" })
  }
  const comments = await userModel.getCommentsByUsername(query);
  res.json(comments);
}

async function getDraftsByUsername(req, res) {
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
  // retrieve current user's userId
  const currentUserId = jwt.decode((req.headers.authorization.split(" ")[1]), { complete: true }).payload.userId;
  const query = {
    userId: currentUserId,
    username: req.params.username,
    sort: ((sort || { "lastEditedAt": "desc" }))
  }
  const drafts = await userModel.getDraftsByUsername(query);
  if (drafts === "forbidden") {
    return res.status(403).json("Forbidden");
  }
  res.json(drafts);
}

module.exports = {
  createUser,
  getAllUsers,
  getUserByUsername,
  updateUser,
  deleteUser,
  getPostsByUsername,
  getCommentsByUsername,
  getDraftsByUsername
}