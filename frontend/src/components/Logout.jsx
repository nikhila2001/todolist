
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from './AppContextProvider';
import { toast } from "react-hot-toast";

const Logout = () => {
    const navigate = useNavigate();

    const { setIsAuth, isAuth } = useContext(AppContext) 


    const handleLogout = () => {
        // setIsAuth(false);
        console.log("user logged out");
        // Clear JWT token from local storage upon logout
        localStorage.clear();
        toast.success();

        // Redirect user to login page or any other page after logout
        console.log("user logged out");

        navigate('/login');
        
    };

    return (
        <button onClick={handleLogout}>Logout</button>
    );
};
export default Logout;                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         