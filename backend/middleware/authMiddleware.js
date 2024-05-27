const { json } = require("express");
var jwt = require("jsonwebtoken");
const JWT_SECRET = "my@secret";
console.log("JWT_SECRET in middleware", JWT_SECRET);

const authenticateUser = (req, res, next) => {
  console.log("Middleware Called");
  try {
    // 'Authorization' header with 'Bearer token' format
    const token = req.headers.token;

    // verify and decode the JWT token
    const decoded = jwt.verify(token, JWT_SECRET);
    // Attach the decoded user data to the request object
    req.user = decoded;
    // If valid, proceed to the route handler
    next();
  } catch (error) {
    // Unauthorized if token is invalid or missing
    res.status(401).json({ message: "Unauthorized" });
  }
};

module.exports = authenticateUser;
