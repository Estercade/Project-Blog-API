const commentModel = require("../models/commentModel");

async function createComment(req, res) {
  query = {
    content: req.body.content,
    authorId: req.body.authorId,
    postId: req.body.postId,
  }
  const comment = await commentModel.createComment(query);
  res.json(comment);
}

async function getCommentsByPostId(req, res) {
  const postId = req.params.postId;
  const comments = await commentModel.getCommentsByPostId(postId);
  res.json(comments);
}

async function getCommentsByCommentId(req, res) {
  const commentId = req.params.commentId;
  const comment = await commentModel.getCommentsByCommentId(commentId);
  res.json(comment);
}

async function getCommentsByUser(req, res) {
  const userId = req.params.userId;
  const comments = await commentModel.getCommentsByPost(userId);
  res.json(comments);
}

async function updateComment(req, res) {
  const commentId = req.params.commentId;
  const content = req.body.content;
  const comment = await commentModel.updateComment(commentId, content);
  res.json(comment);
}

async function deleteComment(req, res) {
  const commentId = req.params.commentId;
  await commentModel.deleteComment(commentId);
  res.json("Comment deleted");
}

module.exports = {
  createComment,
  getCommentsByCommentId,
  getCommentsByPostId,
  getCommentsByUser,
  updateComment,
  deleteComment
}