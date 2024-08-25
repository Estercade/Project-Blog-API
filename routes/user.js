const { Router } = require("express");
const userController = require("../controllers/userController");
const post = require("./post");

const router = Router();

router.post("/", userController.createUser);
router.get("/", userController.getAllUsers);
router.get("/:username", userController.getUserByUsername);
router.put("/:username", userController.updateUser);
router.delete("/:username", userController.deleteUser);
router.get("/:username/posts", userController.getPostsByUsername);
router.get("/:username/comments", userController.getCommentsByUsername);

module.exports = router;