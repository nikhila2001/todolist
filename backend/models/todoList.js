const mongoose = require("mongoose");
const TodoSchema = new mongoose.Schema({
  title: {
    type: "String",
    required: true,
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "user",
  },

  status: {
    type: "String",
  },
  deadline: {
    type: Date,
  },
  completed: {
    type:Boolean,
    default:false, // Default to false (not completed)
  }
});

const Todos = mongoose.model("todos", TodoSchema);

module.exports = Todos;
