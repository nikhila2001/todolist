const express = require('express');

const router = express.Router();
const { registerUser } = require('../controllers/userContoller.js');
router.post('/register', registerUser);
// router.post('/', loginUser);

module.exports = router;