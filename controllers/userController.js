const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

async function createUser(req, res, next) {
  if (!req.body.username | !req.body.email | !req.body.password) {
    return res.status(204).json("Please complete required fields.");
  } else if (req.body.password.length < 5) {
    return res.status(403).json("Password must be at least 5 characters long.")
  }
  const match = await userModel.getUserByUsername(req.body.username);
  if (match) {
    return res.status(403).json("Username already exists.");
  } else {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const query = {
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword
    }
    const user = await userModel.createUser(query);
    res.json(user);
  }
}

async function getAllUsers(req, res) {
  const users = await userModel.getAllUsers();
  res.json(users);
}

async function getUserByUsername(req, res) {
  const user = await userModel.getUserByUsername(req.params.username);
  res.json(user);
}

async function getUserById(req, res) {
  const user = await userModel.getUserById(req.params.userId);
  res.json(user);
}

async function updateUser(req, res, next) {
  // decline request if client is not authenticated
  if (!req.headers.authorization) {
    return res.status(403).json("Forbidden");
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
  // userModel will return "taken" string if username is already taken by another user
  if (user === "taken") {
    return res.status(409).json("That username already exists. Please choose another.");
  }
  res.json(user);
}

async function deleteUser(req, res) {
  // decline request if client is not authenticated
  if (!req.headers.authorization) {
    return res.status(403).json("Forbidden");
  }
  // retrieve current user's userId
  const currentUserId = jwt.decode((req.headers.authorization.split(" ")[1]), { complete: true }).payload.userId;
  // if target user's userId and current userId do not match, return HTTP error
  if (req.params.userId !== currentUserId) {
    return res.status(403).json("Forbidden");
  }
  await userModel.deleteUser(req.params.userId);
  res.json("User deleted");
}

async function getPostsByUsername(req, res) {
  const sort = {};
  switch (req.query.sort) {
    case "date":
      sort["publishedAt"] = (req.query.order || "asc");
      break;
    case "title":
      sort["title"] = (req.query.order || "asc");
      break;
    case "rating":
      sort["averageRating"] = (req.query.order || "asc");
      break;
    case "comments":
      sort["comments"] = { "_count": (req.query.order || "asc") };
      break;
  }
  const query = {
    username: req.params.username,
    sort: sort
  }
  const posts = await userModel.getPostsByUsername(query);
  res.json(posts);
}

async function getCommentsByUsername(req, res) {
  console.log(req.query);
  const sort = {};
  if (req.query.sort === "date") {
    sort["posted"] = (req.query.order || "asc")
  }
  const query = {
    username: req.params.username,
    sort: sort
  }
  const comments = await userModel.getCommentsByUsername(query);
  res.json(comments);
}

async function getDraftsByUsername(req, res) {
  // decline request if client is not authenticated
  if (!req.headers.authorization) {
    return res.status(403).json("Forbidden");
  }
  // retrieve current user's userId
  const currentUserId = jwt.decode((req.headers.authorization.split(" ")[1]), { complete: true }).payload.userId;
  const drafts = await userModel.getDraftsByUsername(req.params.username, currentUserId);
  if (drafts === "forbidden") {
    return res.status(403).json("Forbidden");
  }
  res.json(drafts);
}

module.exports = {
  createUser,
  getAllUsers,
  getUserByUsername,
  getUserById,
  updateUser,
  deleteUser,
  getPostsByUsername,
  getCommentsByUsername,
  getDraftsByUsername
}