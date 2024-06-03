import { AppContext } from "../components/AppContextProvider";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import TodoLists from "../components/TodoLists";
import { Navigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const host = "http://localhost:4000/api";

const headers = {
  "Content-Type": "application/json",
  token: localStorage.getItem("token"),
};

const validationSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  status: Yup.string().required("Status is required"),
  deadline: Yup.date().required("Deadline is required"),
});

function Home() {
  const [userTasks, setUserTasks] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const { isAuth } = useContext(AppContext);

  // get all tasks of a user
  const getAllTask = async () => {
    try {
      // Fetching tasks based on user id
      let response = await axios.get(`${host}/todos`, { headers: {
        "Content-Type": "application/json",
        token: localStorage.getItem("token"),
      } });
      setUserTasks(response.data);
    } catch (error) {
      console.log("error:", error);
      toast.error(error.message);
    }
  };

  // handle form data
  const handleAddtask = async (values, { resetForm }) => {
    try {
      const data = await axios.post(
        `${host}/todos/create`,
        {
          title: values.title,
          status: values.status,
          // deadline: values.deadline,
        },
        { headers }
      );
      toast.success("Task added");
      resetForm();
      getAllTask(); // fetch updated task after adding todo
      setRefresh((prev) => !prev);
    } catch (error) {
      console.log("error:", error);
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    getAllTask();
  }, []);

  // handle delete task
  const deleteTodo = async (id) => {
    try {
      const response = await axios.post(
        `${host}/todos/deleteTodo`,
        { id },
        { headers }
      );
      if (response.status !== 200) {
        console.log(response.status);
        throw new Error("Faild to delete a task");
      }
      toast.success("Todo Deleted");
      getAllTask();
    } catch (error) {
      console.error("Error deleting task :", error.message);
    }
  };

  if (!isAuth) return <Navigate to="/login" />;

  return (
    <>
      {/* Form to add the todo */}

       <div className="">
        <h1>To Do App</h1>
        <Formik
          initialValues={{
            title: "",
            status: "",
            // deadline: "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleAddtask}
        >
          {({ errors, touched }) => (
            <Form className="d-flex">
              
               
                <div className="">
                  <Field
                    type="text"
                    placeholder="enter your task here"
                    className={`form-control  ${
                      errors.title && touched.title ? "is-invalid" : ""
                    }`}
                    id="title"
                    name="title"
                  />
                  <ErrorMessage
                    name="title"
                    component="div"
                    className="invalid-feedback"
                  />
                </div>
             

              
               
                <div className="">
                  <Field
                    type="text"
                    placeholder="status"
                    className={`form-control  ${
                      errors.status && touched.status ? "is-invalid" : ""
                    }`}
                    id="inputStatus"
                    name="status"
                  />
                  <ErrorMessage
                    name="status"
                    component="div"
                    className="invalid-feedback"
                  />
                </div>
              

              {/* <div className="mb-3 row">
                <label
                  htmlFor="inputDeadline"
                  className="col-sm-2 col-form-label"
                >
                  Deadline
                </label>
                <div className="col-sm-10 ">
                  <Field
                    type="date"
                    placeholder="enter date"
                    className={`form-control input-field ${
                      errors.deadline && touched.deadline ? "is-invalid" : ""
                    }`}
                    id="inputDeadline"
                    name="deadline"
                  />
                  <ErrorMessage
                    name="deadline"
                    component="div"
                    className="invalid-feedback"
                  />
                </div>
              </div> */}
              <button
                type="submit"
                className=""
               
              >
                ADD TASK
              </button>
            </Form>
          )}
        </Formik> 
        
        {/* Table view of todos */}
        {userTasks.length === 0 ? (
          <p className="m-auto text-center mt-sm-4 fw-bold fs-2">You don't have anything todo :)</p>
        ) : (
          <table className="table table-dark table-hover align-middle table-responsive-sm mt-sm-3">
            <thead className="">
              <tr>
                <th scope="col" style={{ color: "#e5c07b" }}>
                  No.
                </th>
                <th scope="col" style={{ color: "#e5c07b" }}>
                  Todo item
                </th>
                <th scope="col" style={{ color: "#e5c07b" }}>
                  Status
                </th>
                <th scope="col" style={{ color: "#e5c07b" }}>
                  Actions
                </th>
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
