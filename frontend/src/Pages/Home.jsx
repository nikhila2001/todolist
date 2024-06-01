import { AppContext } from "../components/AppContextProvider";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import TodoLists from "../components/TodoLists";
import { Navigate } from "react-router-dom";
import EditForm from "../components/EditForm";

const host = "http://localhost:4000/api";

 const headers = {
    "Content-Type": "application/json",
    token: localStorage.getItem("token")
  }


function Home() {
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("");
  const [deadline, setDeadline] = useState("");
  const [editingTodo, setEditingTodo] = useState(null)
  const [loading, setLoading] = useState(false);
  const [userTasks, setUserTasks] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const { isAuth } = useContext(AppContext);
  
  const [showModal, setShowModal] = useState(false); 

  // get all tasks of a user
  const getAllTask = async () => {
    try {
      let response = await axios.get(`${host}/todos`, {headers});
      setUserTasks(response.data);
    } catch (error) {
      console.log("error:", error);
      toast.error(error.message);
      
    }
  };

  // handle form data
  const handleAddtask = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await axios.post(
        `${host}/todos/create`,
        {
          title,
          status,
          deadline,
        },
        {headers}
      );
      setLoading(false);
      toast.success("Task added");
      setTitle("");
      setStatus("");
      setDeadline("");
      getAllTask(); // fetch updated task after adding todo
      setRefresh((prev) => !prev);
    } catch (error) {
      console.log("error:", error);
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    getAllTask();
  }, [refresh]);

  // handle delete task
  const deleteTodo = async (id) => {
    try {
      const response = await axios.post(
        `${host}/todos/deleteTodo`,
        { id },
        {headers}
      );
      if (response.status !== 200) {
        console.log(response.status);
        throw new Error("Faild to delete a task");
      }
      toast.success("Todo Deleted")
      getAllTask();
    } catch (error) {
      console.error("Error deleting task :", error.message);
    }
  };

  if (!isAuth) return <Navigate to="/login" />;

  return (
    <>
      {/* Form to add the todo */}

      <div className="d-flex justify-content-between p-md-3">
        <form
          onSubmit={handleAddtask}
          className="todo-container p-md-3 "
          style={{ minWidth: "30rem" }}
        >
          <div className="mb-3 row">
            <label htmlFor="title" className="col-sm-2 col-form-label">
              Title
            </label>
            <div className="col-sm-10">
              <input
                type="text"
                placeholder="enter your todo"
                className="form-control"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="mb-3 row">
            <label htmlFor="inputStatus" className="col-sm-2 col-form-label">
              Status
            </label>
            <div className="col-sm-10">
              <input
                type="text"
                placeholder="status"
                className="form-control"
                id="inputStatus"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="mb-3 row">
            <label htmlFor="inputDeadline" className="col-sm-2 col-form-label">
              Deadline
            </label>
            <div className="col-sm-10">
              <input
                type="date"
                placeholder="enter date"
                className="form-control"
                id="inputDeadline"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                required
              />
            </div>
          </div>
          <button type="submit" className="w-100 btn btn-info">
            ADD TASK
          </button>
        </form>

        {/* Table view of todos */}
        {userTasks.length === 0 ? (<p>You don't have anything todo</p>) : (
          <table className="table table-dark table-hover align-middle table-responsive-sm">
          <thead className="">
            <tr>
              <th scope="col">Task</th>
              <th scope="col">Status</th>
              <th scope="col">Deadline</th>
              <th scope="col">Action Buttons</th>
            </tr>
          </thead>
          <tbody className="">
            {userTasks.map((task) => (
                <TodoLists
                key={task._id}
                task={task}
                deleteTodo={deleteTodo}
                userTasks={userTasks}
                setUserTasks={setUserTasks}
              />
            ))}
          </tbody>
        </table>
        )}
      </div>
    </>
  );
}
export default Home;
