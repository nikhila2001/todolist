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
    <button className="border-0 p-2 btn text-info ps-0" onClick={handleLogout}>
      Logout
    </button>
  );
};
export default Logout;
