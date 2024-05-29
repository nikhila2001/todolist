import { AppContext } from "../components/AppContextProvider";
import React, { useContext, useEffect, useState } from "react";
import Loader from "../components/Loader";

import { Navigate } from "react-router-dom";

function Profile({}){
  const [showOffcanvas, setShowOffcanvas] = useState(false);
    const { user,  isAuth,loading } = useContext(AppContext);

    if (!isAuth) return <Navigate to="/login" />;
    const toggleOffcanvas = () => {
      setShowOffcanvas(!showOffcanvas);
    };
  

    return (
      <div>
      <button
        className="nav-link btn btn-link"
        type="button"
        onClick={toggleOffcanvas}
        aria-controls="profileOffcanvas"
      >
        Profile
      </button>

      <div
        className={`offcanvas offcanvas-start ${showOffcanvas ? 'show' : ''}`}
        tabIndex="-1"
        id="profileOffcanvas"
        aria-labelledby="profileOffcanvasLabel"
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="profileOffcanvasLabel">
            profile
          </h5>
          <button
            type="button"
            className="btn-close"
            onClick={toggleOffcanvas}
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body">
          {/* Profile content goes here */}
          <p>Welcome to your profile!</p>
        </div>
      </div>
    </div>
    )
}
export default Profile;