import { AppContext } from "../components/AppContextProvider";
import React, { useContext, useEffect, useState } from "react";
import Loader from "../components/Loader";
import Logout from "../components/Logout";
import axios from "axios";
import { Navigate } from "react-router-dom";
import toast from "react-hot-toast";

// headers
const host = "http://localhost:4000/api";
const token = localStorage.getItem("token")
const headers = {
  "Content-Type": "application/json",
  token: token
};

function Profile({}){
    const {  isAuth } = useContext(AppContext);
    console.log(isAuth,"isAuth");
    const [userDetails,setUserDetails] = useState({});


   useEffect(() => {
      console.log(isAuth, "inside useEffect");
      fetchUserDetails();
  
   }, [isAuth])




     const  fetchUserDetails = async() => {
      try {
        const data = await axios.get(`${host}/user/me`, {headers});  
        const userData = data.data.user
        console.log("loggedIn user data", userData);
        setUserDetails(userData);
      } catch (error) {
        toast.error("something went wrong");
        console.log("error fetching user details", error.message);
      }
    }

    if (!isAuth) return <Navigate to="/login" />;
    
    return (
     <>
  {/* Dropdown content goes here */}
         <li style={{width:"15rem"}}>
          <p>{userDetails.username}</p>
         </li>
         <li>
          <p>{userDetails.email}</p>
         </li>
         <li>
          <Logout/>
         </li>
     </>
    ) 
}
export default Profile;