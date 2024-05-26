const User = require("../models/User.js");
var bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");
const JWT_SECRET = "my@secret";
console.log("JWT_SECRET in controller", JWT_SECRET);

// 1. controller methods for register and login

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
    console.log(existingUser, "EXTIST");
    if (existingUser) {
      return res
        .status(404)
        .json({ message: "Sorry user with this email already exists" });
    }

    // creating hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    // creating new user if user inputs are validated
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });
    await newUser.save();
    // Making the token
    const auth_token = jwt.sign({ userId: newUser._id }, JWT_SECRET, { expiresIn: '1h' });
    console.log("auth_token", auth_token);
    return res
      .status(201)
      .json({ message: "User created successfully", auth_token });
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ message: "Server error" });
  }
};

// 2. Authenticate user with login
const loginUser = async (req, res) => {
  try {
    // validation methods for user inputs
    const validations = [
      check("email")
        .isEmail()
        .withMessage("Please enter a valid email address"),
      check("password")
        .isLength({ min: 5 })
        .exists()
        .withMessage("Password should not be blank"),
    ];
    await Promise.all(validations.map((validation) => validation.run(req)));
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    // find user by email
    let findUser = await User.findOne({ email });
    if (!findUser) {
      return res
        .status(404)
        .json({ error: "Please try again with correct credentials" });
    }
    // compare passwords
    const comparePassword = bcrypt.compare(password, findUser.password);
    if (!comparePassword) {
      return res
        .status(404)
        .json({ error: "Please try again with correct credentials" });
    }
    const auth_token = jwt.sign({ userId: findUser._id }, JWT_SECRET, { expiresIn: '1h' });
    return res.status(201).json({ message: "login success", auth_token, user: findUser });
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ message: "Server error" });
  }
};

// 3. get loggedIN user details
const getUserDetails = async (req, res) => {
  console.log("Controller Called ")
  try {
    console.log("Authorized User: ", req.user)
    // fetch user details from the database based on the Id attached to the request object
    const user = await User.findById(req.user.userId).select("-password");
    res.json(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Sever Error" });
  }
};

module.exports = { registerUser, loginUser, getUserDetails };
