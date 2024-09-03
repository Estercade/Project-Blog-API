const { Router } = require("express");
const adminController = require("../controllers/adminController");
const auth = require("../utils/auth");

const router = Router();

router.get("/users/", auth.adminAuthenticate, adminController.getAllUsers);
router.get("/users/:username", adminController.getUserByUsername);
router.put("/users/:username", adminController.updateUser);
router.delete("/users/:username", adminController.deleteUser);
router.get("/users/:username/posts", adminController.getPostsByUsername);
router.get("/users/:username/comments", adminController.getCommentsByUsername);
router.get("/users/:username/drafts", adminController.getDraftsByUsername);
router.get("/posts", adminController.getAllPosts);
router.get("/posts/:postId", adminController.getPostByPostId);
router.delete("/posts/:postId", adminController.deletePost);
router.get("/posts/:postId/comments", adminController.getCommentsByPostId);
router.get("/comments/:commentId", adminController.getCommentByCommentId);
router.delete("/comments/:commentId", adminController.deleteComment);

module.exports = router;
