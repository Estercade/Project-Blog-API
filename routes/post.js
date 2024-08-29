const { Router } = require("express");
const postController = require("../controllers/postController");

const router = Router();

router.post("/", postController.createPost);
router.get("/", postController.getAllPosts);
router.get("/:postId", postController.getPostByPostId);
router.put("/:postId", postController.updatePost);
router.delete("/:postId", postController.deletePost);
router.patch("/:postId/published", postController.publishPost);
router.patch("/:postId/totalRating", postController.ratePost);
router.get("/:postId/comments", postController.getCommentsByPostId);
router.post("/:postId/comments", postController.createCommentByPostId);

module.exports = router;