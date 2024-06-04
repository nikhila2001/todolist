import axios from "axios";
import { AppContext } from "../components/AppContextProvider";
import React, { useContext } from "react";
import { Link as ReactRouterLink, Navigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const host = "http://localhost:4000/api";
const headers = {
  "Content-Type": "application/json",
  token: localStorage.getItem("token"),
};

function Login() {
  const { setIsAuth, isAuth, setIsLoading, setUserName } =
    useContext(AppContext);

  // validation schema
  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  // handle login form
  const handleLogin = async (values, { resetForm }) => {
    setIsLoading(true);
    try {
      console.log("is auth before login", isAuth);
      // axios request to login user
      const data = await axios.post(`${host}/user/login`, values, {headers});
      console.log(data.data.token, "token");
      // storing the token in localstorage
      localStorage.setItem("token", data.data.token);
      console.log("login form ", data);
      setUserName(data.username);
      setIsAuth(true);
      toast.success("Login Success");

      console.log("isAuth after login", isAuth);
      // clear form data after login
      resetForm();
      setIsLoading(false);
    } catch (error) {
      toast.error("Invalid credentials");
      setIsLoading(false);
      setIsAuth(false);
    }
  };
  // if user is authenticated the send them to the Home page
  if (isAuth && localStorage.getItem("token")) return <Navigate to="/" />;

  return (
    <>
      <div className="form-container">
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleLogin}
        >
          <Form
            className="form-contents px-md-4 pt-md-4"
            
          >
            <h1>Login</h1>
            {/* Email Field */}
            <div className="email-field ">
              <label htmlFor="email" className="form-label">
                Email address
              </label>
              <Field
                type="email"
                className="form-control border-secondary"
                id="email"
                name="email"
                required
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
            {/* Password Field */}
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <Field
                type="password"
                className="form-control border-secondary"
                id="password"
                name="password"
                required
              />
              <ErrorMessage
                name="password"
                component="div"
                className="text-danger"
              />
            </div>
            {/* Login Field */}
            <button type="submit" className="btn btn-primary w-100 mb-3">
              Sign in
            </button>
            <p className="text-end mb-3">
              New here? &nbsp;
              <ReactRouterLink to="/register">Register</ReactRouterLink>
            </p>
          </Form>
        </Formik>
      </div>
    </>
  );
}

export default Login;
