const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware.js");

const {
  getAllTodos,
  postCreateTodo,
  updateTodo,
  deleteTodo,
} = require("../controllers/todoController.js");

router.get("/", authMiddleware, getAllTodos);

router.post("/create", authMiddleware, postCreateTodo);

router.put("/updateTodo/:id", authMiddleware, updateTodo);

router.post("/deleteTodo", authMiddleware, deleteTodo);

module.exports = router;
