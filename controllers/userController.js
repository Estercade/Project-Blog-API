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
  res.send(user);
}

async function getAllUsers(req, res) {
  const users = await userModel.getAllUsers();
  return res.send(users);
}

async function getUserByUsername(req, res) {
  const username = req.params.username;
  const user = await userModel.getUserByUsername(username);
  return res.send(user);
}

async function getUserById(req, res) {
  const userId = req.params.userId;
  const user = await userModel.getUserById(userId);
  return res.send(user);
}

async function updateUser(req, res, next) {
  const username = req.params.username;
  const { newUsername, email } = req.body;
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  const user = await userModel.updateUser(username, newUsername, hashedPassword, email);
  return res.send(user);
}

async function deleteUser(req, res) {
  const userId = req.params.userId;
  await userModel.deleteUser(userId);
  res.send("User deleted");
}

async function getPostsByUsername(req, res) {
  const username = req.params.username;
  const posts = await userModel.getPostsByUsername(username);
  res.send(posts);
}

async function getCommentsByUsername(req, res) {
  const username = req.params.username;
  const comments = await userModel.getCommentsByUsername(username);
  res.send(comments);
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