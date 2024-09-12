const { Router } = require("express");
const postController = require("../controllers/postController");
const auth = require("../utils/auth");

const router = Router();

router.post("/", auth.authenticate, postController.createPost);
router.get("/", postController.getAllPosts);
router.get("/:postId", postController.getPostByPostId);
router.put("/:postId", auth.authenticate, postController.updatePost);
router.delete("/:postId", auth.authenticate, postController.deletePost);
router.post("/:postId/ratings", auth.authenticate, postController.ratePost);
router.put("/:postId/ratings", auth.authenticate, postController.ratePost);
router.get("/:postId/comments", postController.getCommentsByPostId);
router.post("/:postId/comments", auth.authenticate, postController.createCommentByPostId);

module.exports = router;