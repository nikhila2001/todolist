const express = require('express');

const router = express.Router();
const { registerUser, loginUser} = require('../controllers/userContoller.js');

// create user route
router.post('/register', registerUser);

// authenticate user route
router.post('/login', loginUser);

module.exports = router;