const { Router } = require("express");
const commentController = require("../controllers/commentController");
const auth = require("../utils/auth");

const router = Router();

router.get("/:commentId", commentController.getCommentByCommentId);
router.put("/:commentId", auth.authenticate, commentController.updateComment);
router.delete("/:commentId", auth.authenticate, commentController.deleteComment);

module.exports = router;