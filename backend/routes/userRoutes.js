const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  getLoggedInUserDetails,
  
} = require("../controllers/userContoller.js");
const authenticateUser = require("../middleware/authMiddleware");

// create user route
router.post("/register", registerUser);

// login user route
router.post("/login", loginUser);

// protcted route requires authentication
router.get("/me", authenticateUser, getLoggedInUserDetails);

// edit user profile
router.post("/editUser", authenticateUser)

module.exports = router;
