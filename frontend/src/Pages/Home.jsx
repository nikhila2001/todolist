import { AppContext } from "../components/AppContextProvider";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import TodoLists from "../components/TodoLists";
import { Navigate } from "react-router-dom";

const host = "http://localhost:4000/api";
const config = {
  headers:{
    "Content-Type":"application/json",
    "token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjUzNGIyMjMxMzhiYTE1MzA1OTY1MTkiLCJpYXQiOjE3MTY3ODY4MjUsImV4cCI6MTcxNzM5MTYyNX0.ZYem6DQHgvTBidXBCG9H60Eye6i0fyIwyWjin0Tr_f4"
  }
}

function Home () {
    const [title, setTitle] = useState("");
    const [status, setStatus] = useState("");
    const [deadline, setDeadline] = useState("");
    const [loading, setLoading] = useState(false);
      const [userTasks, setUserTasks] = useState([]);
    const [refresh, setRefresh] = useState(false);
    const {  isAuth } = useContext(AppContext);


    // get all tasks of a user
    const getAllTask = async () => {
        try {
          let  response  = await axios.get(`${host}/todos`, config)
          setUserTasks(response.data);
        } catch (error) {
          console.log("error:", error);
          toast.error(error.message);
        }
      };
   
    // update ord edit todo
    const updateTodo = async (id) => {
        try {
          const data  = await axios.post(`${host}/todos/updateTodo`, {id,title, status, deadline}, config);
          toast.success(data.message);
          setRefresh((prev) => !prev);
        } catch (error) {
          console.log("error:", error);
          toast.error(error.response.data.message);
        }
      };


    // delete todo
    const deleteTodo = async (id) => {
        try {
          const  data  = await axios.post(`${host}/todos/deleteTodo`, config)
          
          toast.success(data.message);
          setRefresh((prev) => !prev);
        } catch (error) {
          console.log("error:", error);
          toast.error(error.response.data.message);
        }
      };
    // handle form data
    const handleForm = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
          const data = await axios.post(
            `${host}/todos/create`,
            {
              title,
              status,
              deadline
            },
            config
          );
          setLoading(false);
          toast.success(data.message);
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

      if (!isAuth) return <Navigate to="/login" />;

    return (
      <>
<div>
    {/* Form to add the todo */}
<form onSubmit={handleForm}>

  <div>
  <label htmlFor="titleInput" className="form-label">Title</label>
        <input
          type="text"
          placeholder="enter your todo"
          id="titleInput"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />   
  </div>

<div>
<label htmlFor="statusInput" className="form-label">Status</label>
<input
          type="text"
          placeholder="status"
          id="statusInput"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        />
</div>

<div>
<label htmlFor="deadlineInput" className="form-label">Deadline</label>
<input
          type="date"
          placeholder="deadline"
          value={deadline}
          id="deadlineInput"
          required
          onChange={(e) => setDeadline(e.target.value)}
        />
</div>

        <button type="submit">ADD TASK</button>
      </form> 
</div>
  {/* Table view of todos */}
  <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Title</th>
                        <th scope="col">Status</th>
                        <th scope="col">Deadline</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <TodoLists todos={userTasks} deadline={deadline} updateTodo={updateTodo} deleteTodo={deleteTodo} />
                </tbody>
            </table>
</>
    )
}
export default Home;
