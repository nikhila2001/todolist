const { json } = require('express');
var jwt = require('jsonwebtoken');
const JWT_SECRET = "my@secret";
console.log("JWT_SECRET in middleware", JWT_SECRET);

const authenticateUser = (req,res,next) => {
    console.log("Middleware Called")
    // get token from header
    const token = req.header('Authorization');
    console.log("Token: ", token)

    // check if token exists
    if(!token) return res.status(401).json({message:"Access denied. Token is required"});
    
    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err){
            console.error("Error: ", err)
            return res.status(403).json({ message: 'Invalid token' });

        } 
        req.user = user;
        next();
        });
}

module.exports = authenticateUser;

