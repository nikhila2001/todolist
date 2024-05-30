import axios from "axios";

const host = "http://localhost:4000/api";
const token = localStorage.getItem("token");
const headers = {
  "Content-Type": "application/json",
  token: token
};

export const fetchUserDetails = async() => {
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