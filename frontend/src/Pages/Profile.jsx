import { AppContext } from "../components/AppContextProvider";
import React, { useContext, useEffect, useState } from "react";
// import Loader from "../components/Loader";
import Logout from "../components/Logout";
import { fetchUserDetails } from "../utils/userUtils"
import { Navigate } from "react-router-dom";
import toast from "react-hot-toast";


function Profile({}){
    const {  isAuth } = useContext(AppContext);
    console.log(isAuth,"isAuth");
    const [userDetails,setUserDetails] = useState({});


   useEffect(() => {
    const getUserDetails = async () => {
      try {
        const userData = await fetchUserDetails();
        setUserDetails(userData);
      } catch (error) {
        toast.error("Failed to fetch user detais", error.message);
      }
    }
    if(isAuth){
      getUserDetails();
    }
   }, [isAuth])


    if (!isAuth) return <Navigate to="/login" />;
    
    return (
      <div>
      {isAuth && localStorage.getItem("token") && (
          <>
              <p>Username: {userDetails.username}</p>
              <p>Email: {userDetails.email}</p>
              <Logout />
          </>
      )}
  </div>
     
    ) 
}
export default Profile;