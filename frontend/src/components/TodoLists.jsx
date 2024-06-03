// TodoLists.jsx
import React from "react";
import { useState } from "react";
import EditForm from "../components/EditForm";
import axios from "axios";
import toast from "react-hot-toast";

const host = "http://localhost:4000/api";

const headers = {
  "Content-Type": "application/json",
  token: localStorage.getItem("token"),
};

function TodoLists({ task, deleteTodo, userTasks, setUserTasks }) {
  // const [userTasks, setUserTasks] = useState([]);
  const [editingTodo, setEditingTodo] = useState(null);

  const formattedDeadline =
    new Date(task.deadline).toLocaleDateString() || "Invalid Date";

  // handle editing a todo
  const handleEdit = (task) => {
    setEditingTodo({
      _id: task._id,
      title: task.title,
      status: task.status,
      deadline: task.deadline,
    });
  };

  // handle updating a todo
  const handleUpdate = async (updatedTodo) => {
    try {
      console.log("updated todo id", updatedTodo._id);
      const response = await axios.put(
        `${host}/todos/updateTodo/${updatedTodo._id}`,
        updatedTodo,
        { headers }
      );
      // update the userTasks state with the updated todo
      setUserTasks(
        userTasks.map((task) =>
          task._id === updatedTodo._id ? response.data : task
        )
      );
      // clear the editing state
      setEditingTodo(null);
      toast.success("Todo Updated Successfully");
    } catch (error) {
      console.log("Error updating todo", error.message);
      toast.error("Failed to update task");
    }
  };

  return (
    <>
      <tr>
        <td>{}</td>
        <td>{task.title}</td>
        <td>{task.status}</td>
        <td className="">
          <button
            className="btn text-success"
            onClick={() => handleEdit(task)}
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
          >
            Edit
          </button>
          {/* Modal edit form */}
          {editingTodo && (
            <div
              className="modal fade "
              id="exampleModal"
              tabIndex="-1"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog ">
                <div className="modal-content bg-dark">
                  <div className="modal-header">
                    <h1 className="modal-title fs-5" id="exampleModalLabel">
                      Edit your task
                    </h1>
                    <button
                      type="button"
                      className="btn-close bg-light"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div className="modal-body">
                    <EditForm
                      task={editingTodo}
                      onUpdate={handleUpdate}
                      onCancel={() => setEditingTodo(null)}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
          <button
            className="btn text-danger"
            onClick={() => {
              deleteTodo(task._id);
            }}
          >
            Delete
          </button>
        </td>
      </tr>
    </>
  );
}

export default TodoLists;
