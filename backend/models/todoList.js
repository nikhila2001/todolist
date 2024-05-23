const mongoose = require('mongoose');

// Controllers
const { getAllTodos, postCreateTodo, putUpdateTodo, deleteTodo } = require('../controllers/todo.js');
const { registerUser } = require('../controllers/userContoller.js');
const TodoSchema = new mongoose.Schema({
    title: {
        type:"String",
        required:true,
    },
    status: {
        type: "String",
    },
    date: {
        type: Date,
        default:Date.now,
    }
});

const Todos = mongoose.model("todos", TodoSchema);

module.exports = TodoSchema;