const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");

async function createUser(req, res, next) {
  const { username, email } = req.body;
  const user = bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
    if (err) {
      next(err);
    } else {
      try {
        await userModel.createUser(username, hashedPassword, email);
      } catch (err) {
        next(err);
      }
    }
  })
  res.json(user);
}

async function getAllUsers(req, res) {
  const users = await userModel.getAllUsers();
  res.json(users);
}

async function getUserByUsername(req, res) {
  const username = req.params.username;
  const user = await userModel.getUserByUsername(username);
  res.json(user);
}

async function getUserById(req, res) {
  const userId = req.params.userId;
  const user = await userModel.getUserById(userId);
  res.json(user);
}

async function updateUser(req, res, next) {
  const username = req.params.username;
  const { newUsername, email } = req.body;
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  const user = await userModel.updateUser(username, newUsername, hashedPassword, email);
  res.json(user);
}

async function deleteUser(req, res) {
  const userId = req.params.userId;
  await userModel.deleteUser(userId);
  res.json("User deleted");
}

async function getPostsByUsername(req, res) {
  const username = req.params.username;
  const posts = await userModel.getPostsByUsername(username);
  res.json(posts);
}

async function getCommentsByUsername(req, res) {
  const username = req.params.username;
  const comments = await userModel.getCommentsByUsername(username);
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