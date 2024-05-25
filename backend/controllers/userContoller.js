const User = require('../models/User.js');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
const JWT_SECREt = "sargam@mikhila";

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
    console.log(req.body,"BODY")

    // check if user with provided email exists
    const existingUser = await User.findOne({email:req.body.email});
    console.log(existingUser,"EXTIST")
    if(existingUser){
      return  res.status(404).json({message:"Sorry user with this email already exists"})
    }

    
    // creating hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt)
      // creating new user if user inputs are validated
      const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword,
      });
      await newUser.save();
      console.log(newUser,"AAAA")
      const auth_token = jwt.sign({userId:newUser._id},JWT_SECREt)
      console.log(auth_token);
      return res.status(201).json({ message: "User created successfully", auth_token});
      
  } catch (err) {
  console.error(err.message);
 return res.status(500).json({ message: "Server error" });
  }
};


// Authenticate user with login
const loginUser = async(req,res) => {
  try{
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
  const {email,password} = req.body.email;
  let findUser = await User.findOne(email);
  console.log("finduser",findUser.password);
    if(!findUser){
      return res.status(404).json({error:"Please try again with correct credentials"})
    }
  
    const comparePassword =  bcrypt.compare(password, findUser.password);
    if(!comparePassword){
      return res.status(404).json({error:"Please try again with correct credentials"})
    }
    const auth_token = jwt.sign({userId:findUser._id},JWT_SECREt);
    return res.status(201).json({message:"login success", auth_token});


  } catch(err) {
    console.error(err.message);
    return res.status(500).json({ message: "Server error" });
  }
}
 
module.exports = {registerUser,loginUser};

