const { Router } = require("express");
const userController = require("../controllers/userController");
const auth = require("../utils/auth");

const router = Router();

router.post("/", userController.createUser);
router.get("/", userController.getAllUsers);
router.get("/:username", userController.getUserByUsername);
router.put("/:username", auth.authenticate, userController.updateUser);
router.delete("/:username", auth.authenticate, userController.deleteUser);
router.get("/:username/posts", userController.getPostsByUsername);
router.get("/:username/comments", userController.getCommentsByUsername);
router.get("/:username/drafts", auth.authenticate, userController.getDraftsByUsername);

module.exports = router;