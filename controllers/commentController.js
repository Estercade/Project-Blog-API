const commentModel = require("../models/commentModel");

async function createComment(req, res) {
  const { content, authorId, postId } = req.body;
  const comment = await commentModel.createComment(content, authorId, postId);
  res.send(comment);
}

async function getCommentsByPostId(req, res) {
  const postId = req.params.postId;
  const comments = await commentModel.getCommentsByPostId(postId);
  res.send(comments);
}

async function getCommentsByCommentId(req, res) {
  const commentId = req.params.commentId;
  const comment = await commentModel.getCommentsByCommentId(commentId);
  res.send(comment);
}

async function getCommentsByUser(req, res) {
  const userId = req.params.userId;
  const comments = await commentModel.getCommentsByPost(userId);
  res.send(comments);
}

async function updateComment(req, res) {
  const commentId = req.params.commentId;
  const content = req.body.content;
  const comment = await commentModel.updateComment(commentId, content);
  res.send(comment);
}

async function deleteComment(req, res) {
  const commentId = req.params.commentId;
  await commentModel.deleteComment(commentId);
  res.send("Comment deleted");
}

module.exports = {
  createComment,
  getCommentsByCommentId,
  getCommentsByPostId,
  getCommentsByUser,
  updateComment,
  deleteComment
}