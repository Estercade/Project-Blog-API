const userModel = require("../models/userModel");
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
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  const query = {
    username: req.body.username,
    email: req.body.email,
    password: hashedPassword
  }
  const user = await userModel.updateUser(req.params.username, query);
  res.json(user);
}

async function deleteUser(req, res) {
  await userModel.deleteUser(req.params.userId);
  res.json("User deleted");
}

async function getPostsByUsername(req, res) {
  const posts = await userModel.getPostsByUsername(req.params.username);
  res.json(posts);
}

async function getCommentsByUsername(req, res) {
  const comments = await userModel.getCommentsByUsername(req.params.username);
  res.json(comments);
}

module.exports = {
  createUser,
  getAllUsers,
  getUserByUsername,
  getUserById,
  updateUser,
  deleteUser,
  getPostsByUsername,
  getCommentsByUsername
}