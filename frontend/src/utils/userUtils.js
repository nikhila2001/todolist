// userUtils.js

import axios from "axios";

const host = "http://localhost:4000/api";

export const fetchUserDetails = async () => {
  try {
    const token = localStorage.getItem("token");
    const headers = {
      "Content-Type": "application/json",
      token: token,
    };
    const response = await axios.get(`${host}/user/me`, { headers });
    return response.data.user;
  } catch (error) {
    throw new Error("Failed to fetch user details", error.message);
  }
};

