const Todos = require('../models/todoList.js');
// controller methods for CRUD operations

// GET All Todos
 const getAllTodos = async (req,res) => {
    try {
        const todos = await Todos.find({});
         return  res.json(todos);
    } catch (err) {
        res.status(404).json({message:err.message})
    } 
};

// POST new todo
 const postCreateTodo = async (req,res) => {
    try {
        const todos = await Todos.create(req.body);
        res.json({message:"Todo added successfully", todos});
    } catch(err) {
        res.status(400).json({message:"Failed to add todo", error:err.message})
    }
}

// edit todo
 const putUpdateTodo = async (req,res) => {
    try {
    const todos = await Todos.findByIdAndUpdate(req.params.id, req.body);
    res.json({message:"Updated successfully", todos})
    } catch(err) {
        res.status(400).json({message:"Failed to update", error:err.message})
    }
}

// delete todo
 const deleteTodo = async (req,res) => {
    try {
        const todos = await Todos.findByIdAndDelete(req.params.id);
        res.json({message:"todo deleted successfully", todos})
    } catch(err) {
        res.status(404).json({message:"book not found", error:err.message})
    }
};

module.exports = {getAllTodos,postCreateTodo,putUpdateTodo,deleteTodo};