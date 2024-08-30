const commentModel = require("../models/commentModel");
const jwt = require("jsonwebtoken");

async function getCommentsByPostId(req, res) {
  const query = {
    postId: req.params.postId
  }
  const comments = await commentModel.getCommentsByPostId(query);
  // database query will return null if specified comment does not exist
  if (comments === null) {
    return res.status(404).json("Resource not found.");
  }
  res.json(comments);
}

async function getCommentByCommentId(req, res) {
  const query = {
    commentId: req.params.commentId
  }
  const comment = await commentModel.getCommentByCommentId(query);
  // database query will return null if specified comment does not exist
  if (comment === null) {
    return res.status(404).json("Resource not found.");
  }
  res.json(comment);
}

async function getCommentsByUser(req, res) {
  const query = {
    userId: req.params.userId
  }
  const comments = await commentModel.getCommentsByPost(query);
  res.json(comments);
}

async function updateComment(req, res) {
  // if data is missing from request body, return HTTP error
  if (!req.body.content) {
    return res.status(400).json("Required information in request body is missing.");
  }
  const query = {
    commentId: req.params.commentId,
    content: req.body.content
  }
  const comment = await commentModel.updateComment(query);
  // database query will return null if specified comment does not exist
  if (comment === null) {
    return res.status(404).json("Resource not found.");
  }
  res.json(comment);
}

async function deleteComment(req, res) {
  const currentUserId = jwt.decode((req.headers.authorization.split(' ')[1]), { complete: true }).payload.userId;
  const query = {
    userId: currentUserId,
    commentId: req.params.commentId
  }
  const post = await commentModel.deleteComment(query);
  // database query will return null if specified comment does not exist
  if (post === null) {
    return res.status(404).json("Resource not found.");
  }
  // database query will return forbidden if author id does not match current user's id
  if (post === "forbidden") {
    return res.status(403).json("You do not have access to this file.");
  }
  res.status(204).json();
}

async function rateComment(req, res) {
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
    commentId: req.params.commentId,
  }
  const rating = await commentModel.rateComment(query);
  // database query will return null if specified comment does not exist
  if (rating === null) {
    return res.status(404).json("Resource not found.");
  }
  // update the comment's rating if rating has been performed
  const comment = await commentModel.updateCommentRating(query);
  res.json(comment);
}

module.exports = {
  getCommentByCommentId,
  getCommentsByPostId,
  getCommentsByUser,
  updateComment,
  deleteComment,
  rateComment
}