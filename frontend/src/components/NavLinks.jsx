// import React, { useContext } from "react";
import { Link } from "react-router-dom";
// import { AppContext } from "./AppContextProvider";

function NavLinks () {
//     const { setIsAuth, isAuth, setIsLoading, loading, userName, setUserName } =
//     useContext(AppContext);


    return (
<nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid">
   <Link className="navbar-brand" href="#">What to do?</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
      <div className="navbar-nav">
       <Link className="nav-link active" aria-current="page" to="/">Home</Link>
       <Link className="nav-link" to="/profile">Profile</Link>
       <Link className="nav-link" to="/login">Login</Link>
       <Link className="nav-link" to="/Register">Register</Link>

      </div>
    </div>
  </div>
</nav>
    )



    
}
export default NavLinks;