import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "./AppContextProvider";
import { toast } from "react-hot-toast";

const Logout = () => {
  const navigate = useNavigate();

  const { setIsAuth } = useContext(AppContext);

  const handleLogout = () => {
    // setIsAuth(false);
    console.log("user logged out");
    // Clear JWT token from local storage upon logout
    localStorage.clear();
    toast.success("Logged out successfully");

    // Redirect user to login page or any other page after logout
    console.log("user logged out");

    navigate("/login");
    setIsAuth(false);
  };

  return (
    <>

    <a type="btn" className="border-0 btn p-0 text-primary " onClick={handleLogout}>
      Logout
    </a>
    
  
    </>
   
  );
};
export default Logout;
