const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware.js");

const {
  getAllTodos,
  postCreateTodo,
  putUpdateTodo,
  deleteTodo,
} = require("../controllers/todoController.js");

router.get("/", authMiddleware, getAllTodos);

router.post("/create", authMiddleware, postCreateTodo);

router.post("/updateTodo", authMiddleware, putUpdateTodo);

router.post("/deleteTodo", authMiddleware, deleteTodo);

module.exports = router;
