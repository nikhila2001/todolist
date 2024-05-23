const User = require('../models/User.js');

// ...rest of the initial code omitted for simplicity.

const { check, validationResult } = require('express-validator');


// controller methods for register and login
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
    let user = User.findOne({email:req.body.email});
    if(user){
        res.status(404).json({error:"Sorry user with this email already exists"})
    }

    
    else {
      // creating new user if user inputs are validated
      const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
      });
      await newUser.save();
      res.status(201).json({ message: "User created successfully" });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server error" });
  }
};


module.exports = {registerUser}

