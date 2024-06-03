import axios from "axios";
import { AppContext } from "../components/AppContextProvider";
import React, { useContext } from "react";
import toast from "react-hot-toast";
import { Link as ReactRouterLink } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Navigate } from "react-router-dom";

const host = "http://localhost:4000/api";
const headers = {
  "Content-Type": "application/json",
  token: localStorage.getItem("token"),
};

function Register() {
  const { setIsAuth, setIsLoading , isAuth} = useContext(AppContext);

  // validation Schema
  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Username is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const handleRegister = async (values, { resetForm }) => {
    try {
      const data = await axios.post(`${host}/user/register`, values, {headers});
      setIsAuth(true);
      toast.success("Welcome");
      resetForm();
      setIsLoading(false);
    } catch (error) {
      console.log("error:", error);
      setIsAuth(false);
      toast.error("Invalid data");
      setIsLoading(false);
    }  
  };
  if (isAuth) return <Navigate to="/login" />;

  return (
    <>
      <div className="form-container">
        <Formik
          initialValues={{
            username: "",
            email: "",
            password: "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleRegister}
        >
          <Form
            className="form-contents px-md-4 pt-md-4"
            style={{ minWidth: "30rem" }}
          >
            <h1>Register</h1>

            <div className="mb-3 first-name-field">
              <label htmlFor="username" className="form-label fs-6">
                User Name
              </label>
              <Field
                type="text"
                className="form-control"
                id="username"
                name="username"
                placeholder="Enter your name"
              />
              <ErrorMessage
                name="username"
                component="div"
                className="text-danger"
              />
            </div>

            <div className="email-field mb-3">
              <label htmlFor="email" className="form-label fs-6">
                Email address
              </label>
              <Field
                type="email"
                className="form-control"
                id="email"
                name="email"
                placeholder="example@gmail.com"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-danger"
              />
              <div className="form-text text-light">
                We'll never share your email with anyone else.
              </div>
            </div>

            <div className="mb-3 password-field">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <Field
                type="password"
                className="form-control"
                id="password"
                name="password"
              />
              <ErrorMessage
                name="password"
                component="div"
                className="text-danger"
              />
            </div>

            <button type="submit" className="btn btn-primary w-100 mb-3 mt-2">
              Sign Up
            </button>
            <p className="text-end">
              Already a user? &nbsp;
              <ReactRouterLink to="/login">Login</ReactRouterLink>
            </p>
          </Form>
        </Formik>
      </div>
    </>
  );
}
export default Register;
