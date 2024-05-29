import axios from "axios";
import { AppContext } from "../components/AppContextProvider";
import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import { Navigate, Link as ReactRouterLink } from "react-router-dom";

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
  const { setIsAuth, isAuth, loading, setIsLoading } = useContext(AppContext);

const handleForm = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
        const  data = await axios.post(
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
        toast.error(error.response.data.message);
        setIsLoading(false);
    };
}
if (isAuth) return <Navigate to="/" />;

  return(
<form>
  <div className="mb-3">

  <div className="mb-3 form-check first-name-field">
  <label className="form-check-label" htmlFor="exampleCheck1">User Name</label>
    <input type="text" className="" id="exampleCheck1" value={username} onChange={(e) => setUserName(e.target.value)}/>
    </div>

    <div className="email-field">
    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
    <input type="email" value={email} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={(e) => setEmail(e.target.value)}/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
    </div>
    
 

  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
    <input type="password" value={password} className="form-control" id="exampleInputPassword1" onChange={(e) => setPassword(e.target.value)}/>
  </div>
 
  </div>
  <button type="submit" isDisabled={loading ? true : false} onClick={handleForm} className="btn btn-primary">Sign Up</button>
  <p>Allready user?
    <ReactRouterLink to="/login">
        Login
    </ReactRouterLink>
  </p>
</form>
    )
}
export default Register;