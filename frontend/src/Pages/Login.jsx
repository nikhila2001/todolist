import axios from "axios";
import { AppContext } from "../components/AppContextProvider";
import React, { useContext, useState } from "react";
import { Link as ReactRouterLink, Navigate } from "react-router-dom";
import Profile from "./Profile";
import { toast } from "react-hot-toast";

const host = "http://localhost:4000/api";
const config = {
  headers: {
    "Content-Type": "application/json",
    token:localStorage.getItem("token")
  },
};

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setIsAuth, isAuth, setIsLoading, loading, setUserName } =
    useContext(AppContext);

  // url and headers

  // handle login form
  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      console.log("is auth before login", isAuth);
      // axios request to login user
      const data = await axios.post(

        `${host}/user/login`,
        { email, password },
        config
      );
      console.log(data.data.token, "token");
      // storing the token in localstorage
      localStorage.setItem('token', data.data.token);
      console.log("login form ", data);
      toast.success(data.message);
      setUserName(data.username);
      setIsAuth(true);
      console.log("isAuth after login", isAuth);
      // clear form data after login
      setEmail("");
      setPassword("");
      setIsLoading(false);
    } catch (error) {
      toast.error("something went wrong");
      setIsLoading(false);
      setIsAuth(false);
    }
  };
  // if user is authenticated the send them to the Home page
  if (isAuth && localStorage.getItem("token"))
    
    return <Navigate to="/" />;

  return (
    <>
    <div className="d-flex justify-content-center align-items-center vw-100 vh-100">
    <form className="form-container px-md-4 pt-md-4 " style={{minWidth:"30rem"}} >
        <h1>Login</h1>
        {/* Email Field */}
        <div className="email-field mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            value={email}
            aria-describedby="emailHelp"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          <div id="emailHelp" className="form-text text-light">
            We'll never share your email with anyone else.
          </div>
        </div>
                {/* Password Field */}
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type="password"
            value={password}
            className="form-control"
            id="exampleInputPassword1"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
           {/* Status Field */}
        <div className="mb-3 form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="exampleCheck1"
          />
          <label className="form-check-label" htmlFor="exampleCheck1">
            Check me out
          </label>
        </div>
          {/* Login Field */}
        <button
          type="submit"
          className="btn btn-primary w-100 mb-3"
          isdisabled={loading ? true : false}
          onClick={handleLogin}
        >
          Sign in
        </button>
        <p className="text-end mb-3">
          New here?
          &nbsp;
          <ReactRouterLink to="/register">Register</ReactRouterLink>
        </p>
      </form>
    </div>
      
    </>
  );
}

export default Login;
