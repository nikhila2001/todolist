const express = require("express");
const router = express.Router();
const authenticateUser = require("../middleware/authMiddleware.js");

const {
  getAllTodos,
  postCreateTodo,
  updateTodo,
  deleteTodo,
} = require("../controllers/todoController.js");

router.get("/", authenticateUser, getAllTodos);

router.post("/create", authenticateUser, postCreateTodo);

router.put("/updateTodo/:id", authenticateUser, updateTodo);

router.post("/deleteTodo", authenticateUser, deleteTodo);

module.exports = router;
