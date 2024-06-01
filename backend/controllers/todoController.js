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
    const { title, status, deadline } = req.body;
    // creating todo
    const todo = new Todos({
      title,
      status,
      deadline,
      user: req.user._id,
    });
    // save todo
    const savedTodo = await todo.save();
    res.json({ message: "Todo added successfully", savedTodo });
  } catch (err) {
    res.status(400).json({ message: "Failed to add todo", error: err.message });
  }
};

  // update an existing todo  todo
  const updateTodo = async (req, res) => {
    try {
      console.log("req.params:", req.params); // Check for presence of params

      const updateTodo = await Todos.findByIdAndUpdate(req.params.id, req.body, {new:true});
      res.json(updateTodo);
    } catch (error) {
      console.error("Error updating todo", error.message);
      res.status(500).json({message: "Failed to update todo"});
    }
  };

// delete todo
const deleteTodo = async (req, res) => {
  try {
    // find the todo to be deleted
    let todo = await Todos.findById(req.body.id);
    console.log("todo id", req.body.id);
    if (!todo) {
      return res.status(404).send("Not found");
    }
    if (todo.user.toString() !== req.user._id) {
      return res.status(401).send(401).send("Not allowed to delete");
    }
    const deletedTodo = await Todos.findByIdAndDelete(req.body.id);
    res.json({ message: "todo deleted successfully", deletedTodo });
  } catch (err) {
    res.status(404).json({ message: "Failed to delete todo", error: err.message });
  }
};



module.exports = { getAllTodos, postCreateTodo, updateTodo, deleteTodo };
