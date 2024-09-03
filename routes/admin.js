const { Router } = require("express");
const adminController = require("../controllers/adminController");
const auth = require("../utils/auth");

const router = Router();

router.get("/users/", auth.adminAuthenticate, adminController.getAllUsers);
router.get("/users/:username", auth.adminAuthenticate, adminController.getUserByUsername);
router.put("/users/:username", auth.adminAuthenticate, adminController.updateUser);
router.delete("/users/:username", auth.adminAuthenticate, adminController.deleteUser);
router.get("/users/:username/posts", auth.adminAuthenticate, adminController.getPostsByUsername);
router.get("/users/:username/comments", auth.adminAuthenticate, adminController.getCommentsByUsername);
router.get("/users/:username/drafts", auth.adminAuthenticate, adminController.getDraftsByUsername);
router.get("/posts", auth.adminAuthenticate, adminController.getAllPosts);
router.get("/posts/:postId", auth.adminAuthenticate, adminController.getPostByPostId);
router.delete("/posts/:postId", auth.adminAuthenticate, adminController.deletePost);
router.get("/posts/:postId/comments", auth.adminAuthenticate, adminController.getCommentsByPostId);
router.get("/comments/:commentId", auth.adminAuthenticate, adminController.getCommentByCommentId);
router.delete("/comments/:commentId", auth.adminAuthenticate, adminController.deleteComment);

module.exports = router;
