const { Router } = require("express");
const commentController = require("../controllers/commentController");

const router = Router();

router.get("/:commentId", commentController.getCommentsByCommentId);
router.put("/:commentId", commentController.updateComment);
router.delete("/:commentId", commentController.deleteComment);

module.exports = router;