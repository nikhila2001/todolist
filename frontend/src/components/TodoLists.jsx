// TodoLists.jsx
import React from "react";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const host = "http://localhost:4000/api";

const headers = {
  "Content-Type": "application/json",
  token: localStorage.getItem("token"),
};

function TodoLists({ task, deleteTodo,index, setUserTasks }) {
  // const [userTasks, setUserTasks] = useState([]);
  const [editingTodo, setEditingTodo] = useState(false);
  const [updatedTask, setUpdatedTask] = useState(task); // State to hold updated task data

  const formattedDeadline =
    new Date(task.deadline).toDateString() || "Invalid Date";

  // handle editing a todo
  const handleEdit = (task) => {
  setEditingTodo(true);
  };

  const handleUpdate = async () => {
    try {
      const response = await axios.put(
        `${host}/todos/updateTodo/${task._id}`,
        updatedTask,
        { headers }
      );
      setUserTasks((prevTasks) =>
        prevTasks.map((t) => (t._id === task._id ? response.data : t))
      );
      setEditingTodo(false);
      toast.success("Todo Updated Successfully");
    } catch (error) {
      console.log("Error updating todo", error.message);
      toast.error("Failed to update task");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedTask((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCancel = () => {
    setEditingTodo(false);
    setUpdatedTask(task);
  };
  
  return (
    <>
      <tr>
        <td>{index}</td>
        <td>{editingTodo ? <input className="w-100 p-2" name="title" value={updatedTask.title} onChange={handleChange}/> : task.title}</td>
        <td>{editingTodo ? <input className="w-100 p-2" name="status" value={updatedTask.status} onChange={handleChange}/> : task.status}</td>
        <td>{editingTodo ? <input className="w-100 p-2" type="date" name="deadline" value={updatedTask.deadline} onChange={handleChange}/> : formattedDeadline}</td>
        <td className="">
        {editingTodo ? (
          <>
            <button className="btn text-success" onClick={handleUpdate}><h5><i className="bi bi-check-lg"></i></h5></button>
            <button className="btn text-secondary" onClick={handleCancel}><h5><i className="bi bi-x-circle text-danger"></i></h5> </button>
          </>
        ) : (
          <button className="btn text-primary" onClick={handleEdit}><h5><i className="bi bi-pencil"></i></h5></button>
        )}
        <button className="btn text-danger" onClick={() => deleteTodo(task._id)}><h5><i className="bi bi-trash3"></i></h5></button>

      </td>
        
      </tr>
    </>
  );
}

export default TodoLists;
