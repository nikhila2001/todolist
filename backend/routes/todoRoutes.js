import express from "express";
import { getAllTodos,postCreateTodo,putUpdateTodo,deleteTodo } from "../controllers/todo.js"
const router = express.Router();



router.get("/", getAllTodos);

router.post('/', postCreateTodo);

router.put('/:id', putUpdateTodo);

router.delete("/:id", deleteTodo);

export default router;