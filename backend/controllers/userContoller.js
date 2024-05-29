const User = require("../models/User.js");
var bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");
const JWT_SECRET = "my@secret";
const authMiddleware = require("../middleware/authMiddleware");
console.log("JWT_SECRET in controller", JWT_SECRET);

// 1. controller methods for register

const registerUser = async (req, res) => {
  try {
    // validation methods for user inputs
    const validations = [
      check("username")
        .isLength({ min: 3 })
        .withMessage("Username must be at least 3 characters long"),
      check("email")
        .isEmail()
        .withMessage("Please enter a valid email address"),
      check("password")
        .isLength({ min: 5 })
        .withMessage("Password must be at least 5 characters long"),
    ];
    await Promise.all(validations.map((validation) => validation.run(req)));
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    console.log(req.body, "BODY");

    // check if user with provided email exists
    const existingUser = await User.findOne({ email: req.body.email });
    console.log("EXTIST", existingUser);
    if (existingUser) {
      return res
        .status(404)
        .json({ message: "Sorry user with this email already exists" });
    }

    // creating hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    
    // register new user if user inputs are validated
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });
    await newUser.save();
    console.log("Saved user", newUser);
    // generate JWT
    const token = jwt.sign({ _id: newUser._id }, JWT_SECRET, {
      expiresIn: "7d",
    }); // Expires in 1 hour
    console.log("registerd user token", token);
    res
      .status(201)
      .json({ message: "User created successfully", token, newUser });
  } catch (err) {
    console.log(err);
    return res.status(400).send("Error. Try again.");
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    // check existing  user in the database
    const user = await User.findOne({ email });
    console.log("existing user ", user);
    if (!user) {
      return res.status(400).json({ message: "No user found " });
    }
    // comapare user entered pw with password stored in database
    const matchPassword = await bcrypt.compare(password, user.password);
    if (!matchPassword) return res.status(400).send("Wrong password");

    // generate JWT on successful login
    const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: "7d" });
    console.log("logged in user token", token);
    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error:error.message });
  }
};

// Controller method for user logout
const logoutUser = async (req, res) => {
  try {
    // Clear any session data or authentication tokens stored on the backend
    
    req.session.destroy((err) => {
      if (err) {
        throw err;
      } else {
        // Respond with a message indicating successful logout
        res.status(200).json({ message: "Logout successful" });
      }
    });
  } catch (error) {
    // Handle any errors that occur during logout process
    res.status(500).json({ message: "Error logging out" });
  }
};


const getLoggedInUserDetails = async (req, res) => {
  try {
    // Access user data from the request object after authentication
    console.log(req.user);
    const user = await User.findById(req.user._id);
    res.status(200).json({ user: user });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving use details" });
  }
};
module.exports = { registerUser, loginUser, logoutUser, getLoggedInUserDetails };
