import mongoose from "mongoose";

const TodoSchema = new mongoose.Schema({
    title: {
        type:"String",
        required:true,
    },
    status: {
        type: "String",
    },
});

const Todos = mongoose.model("todos", TodoSchema);

export default Todos;                                                                                                                                                                                                                                                                       