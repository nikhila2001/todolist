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
  date: {
    type: Date,
    default: Date.now,
  },
});

const Todos = mongoose.model("todos", TodoSchema);

module.exports = Todos;
