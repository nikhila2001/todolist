import axios from "axios";
import { AppContext } from "../components/AppContextProvider";
import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import { Link as ReactRouterLink } from "react-router-dom";

const host = "http://localhost:4000/api";
const config = {
  headers: {
    "Content-Type": "application/json",
    token:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjUzNGIyMjMxMzhiYTE1MzA1OTY1MTkiLCJpYXQiOjE3MTY3ODY4MjUsImV4cCI6MTcxNzM5MTYyNX0.ZYem6DQHgvTBidXBCG9H60Eye6i0fyIwyWjin0Tr_f4",
  },
};

function Register() {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setIsAuth, loading, setIsLoading } = useContext(AppContext);

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const data = await axios.post(
        `${host}/user/register`,
        {
          username,
          email,
          password,
        },
        config
      );
      setIsAuth(true);
      toast.success(data.message);
      setUserName("");
      setEmail("");
      setPassword("");
      setIsLoading(false);
    } catch (error) {
      console.log("error:", error);
      setIsAuth(false);
      toast.error("Invalid data");
      setIsLoading(false);
    }
  };
  // if (isAuth && localStorage.getItem("token")) return <Navigate to="/" />;

  return (
    <>
      <div className="d-flex justify-content-center align-items-center vw-100 vh-100">
        <form
          className="form-container px-md-4 pt-md-4"
          style={{ minWidth: "30rem" }}
        >
          <h1>Register</h1>

          <div className="mb-3  first-name-field">
            <label className="form-label fs-6" htmlFor="exampleCheck1">
              User Name
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleCheck1"
              placeholder="Enter your name"
              value={username}
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>

          <div className=" email-field mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label fs-6">
              Email address
            </label>
            <input
              type="email"
              value={email}
              className="form-control"
              id="exampleInputEmail1"
              placeholder="example@gmail.com"
              aria-describedby="emailHelp"
              onChange={(e) => setEmail(e.target.value)}
            />
            <div id="emailHelp" className="form-text text-light">
              We'll never share your email with anyone else.
            </div>
          </div>

          <div className="mb-3 password-field">
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

          <button
            type="submit"
            isDisabled={loading ? true : false}
            onClick={handleRegister}
            className="btn btn-primary w-100 mb-3 mt-2"
          >
            Sign Up
          </button>
          <p className="text-end">
            Allready user? &nbsp;
            <ReactRouterLink to="/login">Login</ReactRouterLink>
          </p>
        </form>
      </div>
    </>
  );
}
export default Register;
