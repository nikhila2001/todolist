const Todos = require("../models/todoList.js");
const { check, validationResult } = require("express-validator");

// controller methods for CRUD operations

// GET All Todos
const getAllTodos = async (req, res) => {
  try {
    console.log(req.user._id);
    // fetching todos based on user id
    const todos = await Todos.find({ user: req.user._id });
    console.log(todos);
    return res.json(todos);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

// POST new todo
const postCreateTodo = async (req, res) => {
  try {
    const { title, status, date } = req.body;
    // creating todo
    const todo = new Todos({
      title,
      status,
      date,
      user: req.user._id,
    });
    // save todo
    const savedTodo = await todo.save();
    res.json({ message: "Todo added successfully", savedTodo });
  } catch (err) {
    res.status(400).json({ message: "Failed to add todo", error: err.message });
  }
};

// edit an existing todo  todo
const putUpdateTodo = async (req, res) => {
  try {
    const { title, status, deadline } = req.body;
    console.log("req body in updateTodo", req.body);
    // create a new todo obj
    const newTodo = {};
    if (title) {
      newTodo.title = title;
      newTodo.status = status;
      newTodo.deadline = deadline;
    }
    // find the todo to be updated
    let todos = await Todos.findById(req.body.id);
    if (!todos) {
      return res.status(404).send("Not found");
    }
    if (todos.user.toString() !== req.user._id) {
      return res.status(401).send(401).send("Not allowed to edit");
    }
    todos = await Todos.findByIdAndUpdate(
      req.body.id,
      { $set: newTodo },
      { new: true }
    );
    res.json({ message: "Updated successfully", todos });
  } catch (err) {
    res.status(400).json({ message: "Failed to update", error: err.message });
  }
};

// delete todo
const deleteTodo = async (req, res) => {
  try {
    // find the todo to be deleted
    let todos = await Todos.findById(req.body.id);
    if (!todos) {
      return res.status(404).send("Not found");
    }
    if (todos.user.toString() !== req.user._id) {
      return res.status(401).send(401).send("Not allowed to delete");
    }
    todos = await Todos.findByIdAndDelete(req.body.id);
    res.json({ message: "todo deleted successfully", todos });
  } catch (err) {
    res.status(404).json({ message: "book not found", error: err.message });
  }
};

module.exports = { getAllTodos, postCreateTodo, putUpdateTodo, deleteTodo };
