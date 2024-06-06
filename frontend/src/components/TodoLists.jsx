// TodoLists.jsx
import React from "react";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Button } from "@mui/material";


const host = "http://localhost:4000/api";

const headers = {
  "Content-Type": "application/json",
  token: localStorage.getItem("token"),
};

function TodoLists({ task, deleteTodo, index, setUserTasks }) {
  // const [userTasks, setUserTasks] = useState([]);
  const [editingTodo, setEditingTodo] = useState(false);
  const [updatedTask, setUpdatedTask] = useState(task); // State to hold updated task data
  const [markAsDone, setMarkAsDone] = useState(task.completed || false);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);

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
  
  // handle input changes in the Edit form
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
  
  // handle mark as done function
  const handleTaskComplete = async () => {
    try {
      const updatedTask = {
        completed: !markAsDone, // toggle the completed state
      };
      const response = await axios.put(
        `${host}/todos/updateTodo/${task._id}`,
        updatedTask,
        { headers }
      );
      setUserTasks((prevTasks) =>
        prevTasks.map((t) => (t._id === task._id ? response.data : t))
      );
      setMarkAsDone((prevMode) => !prevMode); // Update local state for UI change
      toast.success(markAsDone ? "Marked as Incomplete" : "Marked as Done");
    } catch (error) {
      console.error("Error marking todo as done", error.message);
      toast.error("Failed to update task status");
    }
  };

  // Open the confirmation dialog when delete is clicked
  const handleDeleteConfirmation = (taskId) => {
    setOpenConfirmDialog(true); 
  };

  const handleConfirmDelete = async () => {
    try {
      // delete todo function
      await deleteTodo(task._id);
      setUserTasks((prevTasks) => prevTasks.filter((t) => t._id !== task._id));
      toast.success("Todo deleted successfully");
      setOpenConfirmDialog(false); 
      // Close the dialog after successful deletion

    } catch (error) {
      console.error("Error deleting todo:", error.message);
      toast.error("Failed to delete todo");
      // close the dialog if user cancels
      setOpenConfirmDialog(false)
    }
  };

  // handle cancel delete dailog
  const handleCancelDelete = () => {
    setOpenConfirmDialog(false);
  }

  return (
    <>
      <tr>
        <td>{index}</td>
        <td className={`${markAsDone ? "text-decoration-line-through" : ""}`}>
          {editingTodo ? (
            <input
              className="w-100 p-2"
              name="title"
              value={updatedTask.title}
              onChange={handleChange}
            />
          ) : (
            task.title
          )}
        </td>
        <td>
          {editingTodo ? (
            <input
              className="w-100 p-2"
              name="status"
              value={updatedTask.status}
              onChange={handleChange}
            />
          ) : (
            task.status
          )}
        </td>
        <td>
          {editingTodo ? (
            <input
              className="w-100 p-2"
              type="date"
              name="deadline"
              value={updatedTask.deadline}
              onChange={handleChange}
            />
          ) : (
            formattedDeadline
          )}
        </td>
        <td className="">
          {editingTodo ? (
            <>
              {/* save edits button */} 
              <button
                className="btn text-success"
                name="save"
                onClick={handleUpdate}
              >
                <h5>
                  <i className="bi bi-check-lg"></i>
                </h5>
              </button>
              {/* cancel editing button */}
              <button
                className="btn text-secondary"
                name="cancel"
                onClick={handleCancel}
              >
                <h5>
                  <i className="bi bi-x-circle text-danger"></i>
                </h5>{" "}
              </button>
            </>
          ) : (
            // edit todo button
            <button
              className="btn text-primary"
              name="edit"
              onClick={handleEdit}
            >
              <h5>
                <i className="bi bi-pencil"></i>
              </h5>
            </button>
          )}
         {/* Mark as done todo */}
          <button
            className="btn text-primary"
            name="mark as done"
            onClick={handleTaskComplete}
          >
            <h5>
              <i className="bi bi-check2-square"></i>
            </h5>
          </button>
          
          {/* delete todo */}
          <button
            className="btn text-danger"
            name="delete"
            onClick={() => {handleDeleteConfirmation(task._id)}}
          >
            <h5>
              <i className="bi bi-trash3"></i>
            </h5>
          </button>
        </td>
      </tr>
      {/* Dailog box for confirming delete todo item */}
      <Dialog
      open={openConfirmDialog}
      onClose={handleCancelDelete}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dailog-description"
      >
        <DialogTitle id="alert-dailog-title">
        Confirm Delete
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
           Are you sure you want to delete this todo item ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelDelete}>Cancel</Button>
          <Button variant="contained" color="error" onClick={handleConfirmDelete}>Yes</Button>
        </DialogActions>

      </Dialog>
    </>
  );
}

export default TodoLists;
