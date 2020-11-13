const express = require("express");

const router = express.Router();
const todoController = require("../controllers/todo-controller");
const auth = require("../middleware/auth-middleware")

router.get("/:todoId", todoController.getATodoById);
router.get("/user/:userId", todoController.getTodosByUserId);
router.patch("/:todoId",auth,  todoController.updateATodo);
router.post("/new", auth, todoController.addATodo);
router.delete("/many", todoController.deleteMany);
router.delete("/:todoId", auth, todoController.deleteATodo);

module.exports = router;
