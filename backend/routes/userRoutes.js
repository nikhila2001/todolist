const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  getLoggedInUserDetails,
  logoutUser
} = require("../controllers/userContoller.js");
const authenticateUser = require("../middleware/authMiddleware");

// create user route
router.post("/register", registerUser);

// login user route
router.post("/login", loginUser);

// Logout user route
router.post("/logout", logoutUser);

// protcted route requires authentication
router.get("/me", authenticateUser, getLoggedInUserDetails);

module.exports = router;
