import axios from "axios";
import { AppContext } from "../components/AppContextProvider";
import React, { useContext, useState } from "react";
import { Link as ReactRouterLink, Navigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const host = "http://localhost:4000/api";
const config = {
  headers: {
    "Content-Type": "application/json",
    token:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjUzNGIyMjMxMzhiYTE1MzA1OTY1MTkiLCJpYXQiOjE3MTY3ODY4MjUsImV4cCI6MTcxNzM5MTYyNX0.ZYem6DQHgvTBidXBCG9H60Eye6i0fyIwyWjin0Tr_f4",
  },
};

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isloggedIn, setIsLoggedIn] = useState(false);
   const { setIsAuth, isAuth, setIsLoading, loading, setUserName } =
    useContext(AppContext);

  // url and headers
 

  // handle login form
  const handleForm = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      // axios request to login user
      const data = await axios.post(
        `${host}/user/login`,
        { email, password },
        config
      );
      console.log("login form ", data);
      toast.success(data.message);
      setUserName(data.username);
      setIsAuth(true);
      setEmail("");
      setPassword("");
      setIsLoading(false);
      setIsLoggedIn(true);
    } catch (error) {
      toast.error("something went wrong");
      setIsLoading(false);
      setIsAuth(false);
    }
  };
  // if user is authenticated the send them to the Home page
  // if (isAuth) return <Navigate to="/" />;
  {isloggedIn && <Navigate to="/" />}

return (
    <>
        <form>
            <h1>Sign in to your account</h1>
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label" >Email address</label>
    <input type="email" className="form-control" value={email} aria-describedby="emailHelp" required onChange={(e) => setEmail(e.target.value)}/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
    <input type="password" value={password} className="form-control" id="exampleInputPassword1" onChange={(e) =>setPassword(e.target.value)} />
  </div>
  <div className="mb-3 form-check">
    <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
    <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
  </div>
  <button type="submit" className="btn btn-primary"  isdisabled={loading ? true : false} onClick={handleForm}>Sign in</button>
  <p>New here? 
    <ReactRouterLink to="/register">
    Register
    </ReactRouterLink></p>
</form>                                          
    </>
)
}

export default Login;
