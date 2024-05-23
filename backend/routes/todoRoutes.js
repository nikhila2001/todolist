const express = require('express');
const router = express.Router();

const { getAllTodos, postCreateTodo, putUpdateTodo, deleteTodo } = require('../controllers/todo.js');



router.get("/", getAllTodos);

router.post('/', postCreateTodo);

router.put('/:id', putUpdateTodo);

router.delete("/:id", deleteTodo);

module.exports = router;