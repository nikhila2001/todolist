import { AppContext } from "../components/AppContextProvider";
import React, { useContext, useEffect, useState } from "react";
import Loader from "../components/Loader";

import { Navigate } from "react-router-dom";

function Profile({}){
    const { user,  isAuth,loading } = useContext(AppContext);
    if (!isAuth) return <Navigate to="/login" />;

    return loading ? (<Loader/>) : (
        <div className="card" >
        <div className="card-body">
          <h5 className="card-title">{user?.username}</h5>
          <h6 className="card-subtitle mb-2 text-body-secondary">{user?.email}</h6>         
        </div>
      </div>
    )
}
export default Profile;